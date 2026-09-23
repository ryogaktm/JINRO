// 保存済みの全デバッグログ(=実プレイの記録)からトークン使用量を集計し、
// 1プレイあたりの実測APIコスト(平均・最小・最大)を算出する(開発者専用、ADMIN_SECRETで保護)。
//
// 前提:
// - App.jsx側で1ゲームごとにtokenTotals(input/output/cacheRead/cacheWrite/calls)を累積し、
//   ゲーム終了時にautoSaveDebugLog()がその数値を含むテキストをsave-debug-log経由でRedisに保存している。
// - このエンドポイントはlist-debug-logsと同じ「debuglog:index」からキーを取得し、
//   各ログ本文の「通信状況」セクションの数値を正規表現で抜き出して合算する。
// - 料金はClaude Sonnet 5の標準料金(2026年9月1日以降): 入力$3/MTok・出力$15/MTok、
//   プロンプトキャッシュの新規書き込み(5分, コード側のデフォルト)$3.75/MTok・読み込み$0.30/MTok。
//   料金体系が変わった場合はこのファイル冒頭の定数を更新すること。
import { Redis } from "@upstash/redis";

// VercelのUpstash連携が自動生成する変数名(KV_REST_API_URL/TOKEN)を直接指定する。
// Redis.fromEnv()は既定でUPSTASH_REDIS_REST_URL/TOKENという別名を探すため、
// 名前が一致せず接続できない問題があったので、ここで明示的に読みに行くようにしている。
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

// 円換算レートはUSD/JPYの変動が大きいため、クエリパラメータ ?rate= で上書き可能にしている。
// 指定がなければ目安の値を使う(必要に応じて随時更新)。
const DEFAULT_JPY_RATE = 156;

// Claude Sonnet 5 標準料金(USD / トークン単価)
const PRICE = {
  input: 3 / 1_000_000,
  output: 15 / 1_000_000,
  cacheWrite: 3.75 / 1_000_000, // 5分キャッシュ書き込み(コードのcache_controlはTTL未指定=デフォルト5分)
  cacheRead: 0.30 / 1_000_000,
};

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

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!process.env.ADMIN_SECRET || req.query.secret !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: "権限がありません" });
    return;
  }
  const jpyRate = Number(req.query.rate) > 0 ? Number(req.query.rate) : DEFAULT_JPY_RATE;

  try {
    const keys = await redis.lrange("debuglog:index", 0, 199);
    if (!keys || keys.length === 0) {
      res.status(200).json({ gamesAnalyzed: 0, gamesSkipped: 0, jpyRate });
      return;
    }
    const raw = await redis.mget(...keys);

    let gamesAnalyzed = 0;
    let gamesSkipped = 0;
    let totalInput = 0, totalOutput = 0, totalCacheRead = 0, totalCacheWrite = 0, totalCalls = 0;
    let totalCostUsd = 0;
    let minCostUsd = null, maxCostUsd = null;

    for (const item of raw) {
      let parsed = null;
      try { parsed = typeof item === "string" ? JSON.parse(item) : item; } catch (e) {}
      const content = parsed?.content || "";
      const t = parseTokenTotals(content);
      // callsが0(=API呼び出しが記録されていない/テスト中の破損ログ等)は平均を歪めるので除外する
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
      pricingBasis: "Claude Sonnet 5 標準料金(2026年9月1日以降): 入力$3/output$15/cache書込$3.75/cache読込$0.30 per MTok",
      totals: {
        calls: totalCalls,
        input: totalInput,
        output: totalOutput,
        cacheRead: totalCacheRead,
        cacheWrite: totalCacheWrite,
        costUsd: totalCostUsd,
        costJpy: totalCostUsd * jpyRate,
      },
      average: {
        callsPerGame: gamesAnalyzed > 0 ? totalCalls / gamesAnalyzed : 0,
        inputPerGame: gamesAnalyzed > 0 ? totalInput / gamesAnalyzed : 0,
        outputPerGame: gamesAnalyzed > 0 ? totalOutput / gamesAnalyzed : 0,
        costUsd: avgCostUsd,
        costJpy: avgCostUsd * jpyRate,
      },
      range: {
        minCostUsd: minCostUsd || 0,
        minCostJpy: (minCostUsd || 0) * jpyRate,
        maxCostUsd: maxCostUsd || 0,
        maxCostJpy: (maxCostUsd || 0) * jpyRate,
      },
    });
  } catch (e) {
    res.status(500).json({ error: `集計に失敗しました: ${e.message}` });
  }
}
