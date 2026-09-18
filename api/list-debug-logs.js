// 保存済みのデバッグログ一覧を返す(開発者専用、ADMIN_SECRETで保護)。
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
  try {
    const keys = await redis.lrange("debuglog:index", 0, 199);
    if (!keys || keys.length === 0) {
      res.status(200).json({ logs: [] });
      return;
    }
    const raw = await redis.mget(...keys);
    const logs = keys.map((key, i) => {
      let parsed = null;
      try { parsed = typeof raw[i] === "string" ? JSON.parse(raw[i]) : raw[i]; } catch (e) {}
      if (!parsed) return null;
      return {
        key,
        savedAt: parsed.savedAt,
        userName: parsed.userName,
        deviceId: parsed.deviceId,
        preview: (parsed.content || "").slice(0, 120),
      };
    }).filter(Boolean);
    res.status(200).json({ logs });
  } catch (e) {
    res.status(500).json({ error: `取得に失敗しました: ${e.message}` });
  }
}
