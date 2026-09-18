// 分身NPCが参加したゲームが終わった時、その戦歴を「作った本人(端末ID)」に紐づけて記録する。
// 見せる情報は軽いものだけにする(役職・生死・勝敗・日時)。一緒に遊んだ他プレイヤーの名前や会話内容は含めない。
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const MAX_RECORDS_PER_NPC = 50; // 1体あたりの戦歴保存上限

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
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
