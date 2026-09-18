// 自分の分身NPCの戦歴を取得する(自分の端末IDでのみ照会可能。認証は端末IDそのもの)。
// 実際の参加記録が一定期間増えていない場合、寂しい「0のまま」を避けるため、
// 適当な勝敗を1件だけ水増しして記録する(役職・勝敗はランダム、雑でよい)。
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const STALE_MS = 3 * 24 * 60 * 60 * 1000; // 3日
const ROLES = ["人狼", "狂人", "占い師", "霊媒師", "狩人", "共有者", "ジョーカー", "村人"];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
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

    // 承認済みの分身がいる場合だけ、水増しの対象にする
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
