// 承認済みのNPC分身プールを返す(認証不要、ゲーム開始時にクライアントから呼ばれる)。
// 個人情報は含まない(ニックネーム・抽出済みの性格・印象的な発言・年齢・性別・部活だけ)。
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
  try {
    const keys = await redis.smembers("npc_pool:index");
    if (!keys || keys.length === 0) {
      res.status(200).json({ pool: [] });
      return;
    }
    const raw = await redis.mget(...keys);
    const pool = raw.map((r) => {
      try { return typeof r === "string" ? JSON.parse(r) : r; } catch (e) { return null; }
    }).filter(Boolean);
    res.status(200).json({ pool });
  } catch (e) {
    res.status(500).json({ error: `取得に失敗しました: ${e.message}` });
  }
}
