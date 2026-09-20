// デバッグログ関連の5つのエンドポイントを、Vercel Hobbyプランの
// サーバーレス関数数上限(12個/デプロイ)対策として1ファイルに統合したもの。
// 元は get-debug-log.js / save-debug-log.js / list-debug-logs.js /
// toggle-debug-log-favorite.js / debug-log-cost-stats.js の5ファイルだった。
// クエリパラメータ ?action=... (GET) または body.action (POST) で処理を振り分ける。
//
// 保存件数の管理ルール(save):
// - 上限はMAX_LOGS件(通常ログ・お気に入りログ合わせて)。
// - 新規に保存されるログは favorite: false でスタートする(=通常ログ、古くなったら自動削除の対象)。
// - お気に入り登録されたログ(favorite: true)は、上限を超えても自動削除されない(ずっと保管)。
//   ただし枠自体はMAX_LOGSの中で共有する(お気に入りだからといって上限の外に別枠は無い)。
// - この仕組み導入前の既存ログ(favoriteフィールドが存在しない)は、後方互換のため保護扱い。
// - 上限を超えた分は、古い順に「favorite: false が明示されている」ログだけを削除する。
//   削除できる対象が足りない場合は、データを失わないことを優先し上限超過を許容する。
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const MAX_LOGS = 20;

// Claude Sonnet 5 の料金(USD / トークン単価)。Anthropic公式の料金表(platform.claude.com/docs 「Prompt caching」)に基づく。
// 料金体系が変わったらここを更新する。実際の請求額はAnthropicコンソールが正。
const DEFAULT_JPY_RATE = 156;
const PRICE = {
  input: 2 / 1_000_000,        // 通常入力 $2/MTok
  output: 10 / 1_000_000,      // 出力 $10/MTok
  cacheWrite: 4 / 1_000_000,   // 1時間キャッシュ書き込み $4/MTok(App.jsxのcache_controlはttl:"1h")。※旧ログ(5分キャッシュ時代)は実際には$2.50だったため、その分は少し高めの見積もりになる
  cacheRead: 0.20 / 1_000_000, // キャッシュ読み込み $0.20/MTok
};

function checkAdmin(secret, res) {
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: "権限がありません" });
    return false;
  }
  return true;
}

function parseTokenTotals(content) {
  const calls = content.match(/API呼び出し回数:\s*(\d+)/);
  const input = content.match(/入力トークン:\s*(\d+)/);
  const output = content.match(/出力トークン:\s*(\d+)/);
  const cacheRead = content.match(/読み込み(\d+)トークン/);
  const cacheWrite = content.match(/新規書き込み(\d+)トークン/);
  return {
    calls: calls ? parseInt(calls[1], 10) : 0,
    input: input ? parseInt(input[1], 10) : 0,
    output: output ? parseInt(output[1], 10) : 0,
    cacheRead: cacheRead ? parseInt(cacheRead[1], 10) : 0,
    cacheWrite: cacheWrite ? parseInt(cacheWrite[1], 10) : 0,
  };
}

function costUsdFor(t) {
  return (
    t.input * PRICE.input +
    t.output * PRICE.output +
    t.cacheRead * PRICE.cacheRead +
    t.cacheWrite * PRICE.cacheWrite
  );
}

async function handleSave(req, res) {
  const { deviceId, userName, content } = req.body || {};
  if (!content || typeof content !== "string") {
    res.status(400).json({ error: "contentが必要です" });
    return;
  }
  try {
    const id = `${Date.now()}_${(deviceId || "unknown").slice(0, 8)}`;
    const key = `debuglog:${id}`;
    await redis.set(key, JSON.stringify({
      savedAt: new Date().toISOString(),
      deviceId: deviceId || null,
      userName: userName || null,
      favorite: false,
      content,
    }));
    await redis.lpush("debuglog:index", key);

    const allKeys = await redis.lrange("debuglog:index", 0, -1);
    if (allKeys.length > MAX_LOGS) {
      let excess = allKeys.length - MAX_LOGS;
      const raw = await redis.mget(...allKeys);
      for (let i = allKeys.length - 1; i >= 0 && excess > 0; i--) {
        let parsed = null;
        try { parsed = typeof raw[i] === "string" ? JSON.parse(raw[i]) : raw[i]; } catch (e) {}
        const isProtected = !parsed || parsed.favorite === true || parsed.favorite === undefined;
        if (isProtected) continue;
        await redis.del(allKeys[i]);
        await redis.lrem("debuglog:index", 1, allKeys[i]);
        excess--;
      }
    }
    res.status(200).json({ saved: true, id });
  } catch (e) {
    res.status(500).json({ error: `保存に失敗しました: ${e.message}` });
  }
}

async function handleList(req, res) {
  if (!checkAdmin(req.query.secret, res)) return;
  try {
    const keys = await redis.lrange("debuglog:index", 0, 299);
    if (!keys || keys.length === 0) {
      res.status(200).json({ logs: [] });
      return;
    }
    const raw = await redis.mget(...keys);
    const logs = keys.map((key, i) => {
      let parsed = null;
      try { parsed = typeof raw[i] === "string" ? JSON.parse(raw[i]) : raw[i]; } catch (e) {}
      if (!parsed) return null;
      return {
        key,
        savedAt: parsed.savedAt,
        userName: parsed.userName,
        deviceId: parsed.deviceId,
        preview: (parsed.content || "").slice(0, 120),
        favorite: parsed.favorite === true,
        legacy: parsed.favorite === undefined,
      };
    }).filter(Boolean);
    res.status(200).json({ logs });
  } catch (e) {
    res.status(500).json({ error: `取得に失敗しました: ${e.message}` });
  }
}

async function handleGet(req, res) {
  if (!checkAdmin(req.query.secret, res)) return;
  const key = req.query.key;
  if (!key || typeof key !== "string" || !key.startsWith("debuglog:")) {
    res.status(400).json({ error: "keyが必要です" });
    return;
  }
  try {
    const raw = await redis.get(key);
    if (!raw) {
      res.status(404).json({ error: "見つかりませんでした" });
      return;
    }
    res.status(200).json(typeof raw === "string" ? JSON.parse(raw) : raw);
  } catch (e) {
    res.status(500).json({ error: `取得に失敗しました: ${e.message}` });
  }
}

async function handleToggleFavorite(req, res) {
  const { key, favorite, secret } = req.body || {};
  if (!checkAdmin(secret, res)) return;
  if (!key || typeof key !== "string" || !key.startsWith("debuglog:")) {
    res.status(400).json({ error: "keyが不正です" });
    return;
  }
  try {
    const raw = await redis.get(key);
    if (!raw) {
      res.status(404).json({ error: "ログが見つかりません" });
      return;
    }
    let parsed = null;
    try { parsed = typeof raw === "string" ? JSON.parse(raw) : raw; } catch (e) {}
    if (!parsed) {
      res.status(500).json({ error: "ログの解析に失敗しました" });
      return;
    }
    parsed.favorite = !!favorite;
    await redis.set(key, JSON.stringify(parsed));
    res.status(200).json({ key, favorite: parsed.favorite });
  } catch (e) {
    res.status(500).json({ error: `更新に失敗しました: ${e.message}` });
  }
}

async function handleCostStats(req, res) {
  if (!checkAdmin(req.query.secret, res)) return;
  const jpyRate = Number(req.query.rate) > 0 ? Number(req.query.rate) : DEFAULT_JPY_RATE;
  try {
    const keys = await redis.lrange("debuglog:index", 0, 199);
    if (!keys || keys.length === 0) {
      res.status(200).json({ gamesAnalyzed: 0, gamesSkipped: 0, jpyRate });
      return;
    }
    const raw = await redis.mget(...keys);

    let gamesAnalyzed = 0, gamesSkipped = 0;
    let totalInput = 0, totalOutput = 0, totalCacheRead = 0, totalCacheWrite = 0, totalCalls = 0;
    let totalCostUsd = 0;
    let minCostUsd = null, maxCostUsd = null;

    for (const item of raw) {
      let parsed = null;
      try { parsed = typeof item === "string" ? JSON.parse(item) : item; } catch (e) {}
      const content = parsed?.content || "";
      const t = parseTokenTotals(content);
      if (t.calls === 0 && t.input === 0 && t.output === 0) {
        gamesSkipped += 1;
        continue;
      }
      gamesAnalyzed += 1;
      totalCalls += t.calls;
      totalInput += t.input;
      totalOutput += t.output;
      totalCacheRead += t.cacheRead;
      totalCacheWrite += t.cacheWrite;
      const cost = costUsdFor(t);
      totalCostUsd += cost;
      if (minCostUsd === null || cost < minCostUsd) minCostUsd = cost;
      if (maxCostUsd === null || cost > maxCostUsd) maxCostUsd = cost;
    }

    const avgCostUsd = gamesAnalyzed > 0 ? totalCostUsd / gamesAnalyzed : 0;
    res.status(200).json({
      gamesAnalyzed,
      gamesSkipped,
      jpyRate,
      pricingBasis: "Claude Sonnet 5 公式料金: 入力$2 / 出力$10 / キャッシュ書込(1h)$4 / キャッシュ読込$0.20 per MTok",
      totals: {
        calls: totalCalls, input: totalInput, output: totalOutput,
        cacheRead: totalCacheRead, cacheWrite: totalCacheWrite,
        costUsd: totalCostUsd, costJpy: totalCostUsd * jpyRate,
      },
      average: {
        callsPerGame: gamesAnalyzed > 0 ? totalCalls / gamesAnalyzed : 0,
        inputPerGame: gamesAnalyzed > 0 ? totalInput / gamesAnalyzed : 0,
        outputPerGame: gamesAnalyzed > 0 ? totalOutput / gamesAnalyzed : 0,
        costUsd: avgCostUsd, costJpy: avgCostUsd * jpyRate,
      },
      range: {
        minCostUsd: minCostUsd || 0, minCostJpy: (minCostUsd || 0) * jpyRate,
        maxCostUsd: maxCostUsd || 0, maxCostJpy: (maxCostUsd || 0) * jpyRate,
      },
    });
  } catch (e) {
    res.status(500).json({ error: `集計に失敗しました: ${e.message}` });
  }
}

export default async function handler(req, res) {
  const action = req.method === "GET" ? req.query.action : (req.body || {}).action;
  if (req.method === "POST" && action === "save") return handleSave(req, res);
  if (req.method === "POST" && action === "toggle-favorite") return handleToggleFavorite(req, res);
  if (req.method === "GET" && action === "list") return handleList(req, res);
  if (req.method === "GET" && action === "get") return handleGet(req, res);
  if (req.method === "GET" && action === "cost-stats") return handleCostStats(req, res);
  res.status(400).json({ error: "actionが不正です" });
}
