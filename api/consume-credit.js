// ゲーム開始時にクレジットを1消費する。
// 残高が足りない場合は消費せずエラーを返す(Redisのatomicなdecrementを使い、二重消費を防ぐ)。
import { Redis } from "@upstash/redis";

// VercelのUpstash連携が自動生成する変数名(KV_REST_API_URL/TOKEN)を直接指定する。
// Redis.fromEnv()は既定でUPSTASH_REDIS_REST_URL/TOKENという別名を探すため、
// 名前が一致せず接続できない問題があったので、ここで明示的に読みに行くようにしている。
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { deviceId } = req.body || {};
  if (!deviceId || typeof deviceId !== "string") {
    res.status(400).json({ error: "deviceIdが必要です" });
    return;
  }
  try {
    const key = `credits:${deviceId}`;
    // 残高チェックと減算を1つのLuaスクリプトでアトミックに行い、同時押し等での二重消費を防ぐ
    const result = await redis.eval(
      `local c = tonumber(redis.call('GET', KEYS[1]) or '0')
       if c > 0 then
         redis.call('DECR', KEYS[1])
         return c - 1
       else
         return -1
       end`,
      [key],
      []
    );
    if (result < 0) {
      res.status(402).json({ error: "クレジットが不足しています", credits: 0 });
      return;
    }
    res.status(200).json({ credits: result });
  } catch (e) {
    res.status(500).json({ error: `消費処理に失敗しました: ${e.message}` });
  }
}
