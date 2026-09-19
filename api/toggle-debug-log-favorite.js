// 保存済みデバッグログの「お気に入り」フラグを登録/解除する(開発者専用、ADMIN_SECRETで保護)。
// お気に入り(favorite: true)にしたログは、save-debug-log側の上限管理で自動削除の対象から外れる。
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { key, favorite, secret } = req.body || {};
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: "権限がありません" });
    return;
  }
  if (!key || typeof key !== "string" || !key.startsWith("debuglog:")) {
    res.status(400).json({ error: "keyが不正です" });
    return;
  }
  try {
    const raw = await redis.get(key);
    if (!raw) {
      res.status(404).json({ error: "ログが見つかりません" });
      return;
    }
    let parsed = null;
    try { parsed = typeof raw === "string" ? JSON.parse(raw) : raw; } catch (e) {}
    if (!parsed) {
      res.status(500).json({ error: "ログの解析に失敗しました" });
      return;
    }
    parsed.favorite = !!favorite;
    await redis.set(key, JSON.stringify(parsed));
    res.status(200).json({ key, favorite: parsed.favorite });
  } catch (e) {
    res.status(500).json({ error: `更新に失敗しました: ${e.message}` });
  }
}
