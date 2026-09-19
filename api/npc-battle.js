// NPC戦歴関連の2つのエンドポイントを、Vercel Hobbyプランの関数数上限対策として1ファイルに統合したもの。
// 元は save-npc-battle-record.js / get-npc-battle-history.js の2ファイルだった。
// クエリパラメータ ?action=... (GET) または body.action (POST) で処理を振り分ける。
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const MAX_RECORDS_PER_NPC = 50; // 1体あたりの戦歴保存上限
const STALE_MS = 3 * 24 * 60 * 60 * 1000; // 3日
const ROLES = ["人狼", "狂人", "占い師", "霊媒師", "狩人", "共有者", "ジョーカー", "村人"];

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
        const fake = {
          playedAt: new Date().toISOString(),
          npcName: candidate.nickname,
          role: ROLES[Math.floor(Math.random() * ROLES.length)],
          survived: Math.random() < 0.6,
          teamWon: Math.random() < 0.5,
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
