// クレジット残高を確認する(消費はしない、表示専用)
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

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
    const credits = (await redis.get(`credits:${deviceId}`)) || 0;
    res.status(200).json({ credits: Number(credits) });
  } catch (e) {
    res.status(500).json({ error: `残高の確認に失敗しました: ${e.message}` });
  }
}
