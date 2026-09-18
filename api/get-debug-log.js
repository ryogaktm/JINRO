// 特定のデバッグログの全文を返す(開発者専用、ADMIN_SECRETで保護)。
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!process.env.ADMIN_SECRET || req.query.secret !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: "権限がありません" });
    return;
  }
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
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: `取得に失敗しました: ${e.message}` });
  }
}
