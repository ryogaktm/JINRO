// NPC戦歴関連の2つのエンドポイントを、Vercel Hobbyプランの関数数上限対策として1ファイルに統合したもの。
// 元は save-npc-battle-record.js / get-npc-battle-history.js の2ファイルだった。
// クエリパラメータ ?action=... (GET) または body.action (POST) で処理を振り分ける。
import { Redis } from "@upstash/redis";

// VercelのUpstash連携が自動生成する変数名(KV_REST_API_URL/TOKEN)を直接指定する。
// Redis.fromEnv()は既定でUPSTASH_REDIS_REST_URL/TOKENという別名を探すため、
// 名前が一致せず接続できない問題があったので、ここで明示的に読みに行くようにしている。
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});
const MAX_RECORDS_PER_NPC = 50; // 1体あたりの戦歴保存上限
const STALE_MS = 3 * 24 * 60 * 60 * 1000; // 3日
const ROLES = ["人狼", "狂人", "占い師", "霊媒師", "狩人", "共有者", "ジョーカー", "村人"];
const WOLF_SIDE_ROLES = ["人狼", "狂人"]; // 水増し戦歴の陣営判定用(ジョーカーは基本村人側として扱う)

async function handleSave(req, res) {
  const { creatorDeviceId, npcName, role, survived, teamWon } = req.body || {};
  if (!creatorDeviceId || typeof creatorDeviceId !== "string") {
    res.status(400).json({ error: "creatorDeviceIdが必要です" });
    return;
  }
  try {
    const key = `npc_battles:${creatorDeviceId}`;
    const record = {
      playedAt: new Date().toISOString(),
      npcName: npcName || null,
      role: role || null,
      survived: !!survived,
      teamWon: !!teamWon,
    };
    await redis.lpush(key, JSON.stringify(record));
    await redis.ltrim(key, 0, MAX_RECORDS_PER_NPC - 1);
    res.status(200).json({ saved: true });
  } catch (e) {
    res.status(500).json({ error: `保存に失敗しました: ${e.message}` });
  }
}

// 自分の分身NPCの戦歴を取得する(自分の端末IDでのみ照会可能。認証は端末IDそのもの)。
// 実際の参加記録が一定期間増えていない場合、寂しい「0のまま」を避けるため、
// 適当な勝敗を1件だけ水増しして記録する(役職・勝敗はランダム、雑でよい)。
async function handleGet(req, res) {
  const deviceId = req.query.deviceId;
  if (!deviceId || typeof deviceId !== "string") {
    res.status(400).json({ error: "deviceIdが必要です" });
    return;
  }
  try {
    const battleKey = `npc_battles:${deviceId}`;
    let raw = await redis.lrange(battleKey, 0, 49);
    let records = (raw || []).map((r) => {
      try { return typeof r === "string" ? JSON.parse(r) : r; } catch (e) { return null; }
    }).filter(Boolean);

    const candidateRaw = await redis.get(`npc_candidate:${deviceId}`);
    const candidate = candidateRaw ? (typeof candidateRaw === "string" ? JSON.parse(candidateRaw) : candidateRaw) : null;
    const isApproved = candidate?.status === "approved";

    if (isApproved) {
      const lastTime = records.length > 0
        ? new Date(records[0].playedAt).getTime()
        : new Date(candidate.poolEntry?.approvedAt || candidate.submittedAt).getTime();
      const stale = !lastTime || (Date.now() - lastTime) > STALE_MS;
      if (stale) {
        // 水増し(実プレイに基づかない)の戦歴は、陣営ごとに筋が通るようにする:
        // 人狼側(人狼・狂人)→処刑されて人狼側の負け。村人側(それ以外)→人狼に襲われて死亡するが村人側の勝ち。
        // 「意外と楽勝だった」という自信満々な捨て台詞との整合を保ちつつ、死因と勝敗が矛盾しないようにする。
        const role = ROLES[Math.floor(Math.random() * ROLES.length)];
        const isWolfSide = WOLF_SIDE_ROLES.includes(role);
        const dayDied = Math.random() < 0.8 ? 1 : 2;
        const fake = {
          playedAt: new Date().toISOString(),
          npcName: candidate.nickname,
          role,
          survived: false,
          dayDied,
          deathType: isWolfSide ? "execution" : "night_kill",
          teamWon: !isWolfSide,
        };
        await redis.lpush(battleKey, JSON.stringify(fake));
        await redis.ltrim(battleKey, 0, 49);
        records = [fake, ...records];
      }
    }
    res.status(200).json({ records });
  } catch (e) {
    res.status(500).json({ error: `取得に失敗しました: ${e.message}` });
  }
}

export default async function handler(req, res) {
  if (req.method === "POST" && (req.body || {}).action === "save") return handleSave(req, res);
  if (req.method === "GET" && req.query.action === "get") return handleGet(req, res);
  res.status(400).json({ error: "actionが不正です" });
}
