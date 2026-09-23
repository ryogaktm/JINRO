// NPC分身候補の一覧を返す(開発者専用、ADMIN_SECRETで保護)。
import { Redis } from "@upstash/redis";

// VercelのUpstash連携が自動生成する変数名(KV_REST_API_URL/TOKEN)を直接指定する。
// Redis.fromEnv()は既定でUPSTASH_REDIS_REST_URL/TOKENという別名を探すため、
// 名前が一致せず接続できない問題があったので、ここで明示的に読みに行くようにしている。
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!process.env.ADMIN_SECRET || req.query.secret !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: "権限がありません" });
    return;
  }
  try {
    const keys = await redis.smembers("npc_candidate:index");
    if (!keys || keys.length === 0) {
      res.status(200).json({ candidates: [] });
      return;
    }
    const raw = await redis.mget(...keys);
    const candidates = keys.map((key, i) => {
      let parsed = null;
      try { parsed = typeof raw[i] === "string" ? JSON.parse(raw[i]) : raw[i]; } catch (e) {}
      if (!parsed) return null;
      return {
        key,
        submittedAt: parsed.submittedAt,
        nickname: parsed.nickname,
        status: parsed.status || "pending",
        preview: (parsed.content || "").slice(0, 150),
      };
    }).filter(Boolean).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    res.status(200).json({ candidates });
  } catch (e) {
    res.status(500).json({ error: `取得に失敗しました: ${e.message}` });
  }
}
