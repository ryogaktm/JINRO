// プレイヤーのデバッグログをサーバー(Redis)に自動保存する。開発者のデバッグ用途。
// ゲーム終了時にフロントエンドから自動的に呼ばれる(プレイヤーの操作は不要)。
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const MAX_LOGS = 200; // 保存しすぎてストレージを圧迫しないよう、上限を超えたら古いものから捨てる

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { deviceId, userName, content } = req.body || {};
  if (!content || typeof content !== "string") {
    res.status(400).json({ error: "contentが必要です" });
    return;
  }
  try {
    const id = `${Date.now()}_${(deviceId || "unknown").slice(0, 8)}`;
    const key = `debuglog:${id}`;
    await redis.set(key, JSON.stringify({
      savedAt: new Date().toISOString(),
      deviceId: deviceId || null,
      userName: userName || null,
      content,
    }));
    // 一覧用のインデックス(新しい順)に追加
    await redis.lpush("debuglog:index", key);
    await redis.ltrim("debuglog:index", 0, MAX_LOGS - 1);
    res.status(200).json({ saved: true, id });
  } catch (e) {
    res.status(500).json({ error: `保存に失敗しました: ${e.message}` });
  }
}
