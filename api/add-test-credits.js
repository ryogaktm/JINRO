// 開発者がテストプレイ用に、実際の決済を挟まずクレジットを付与するための管理用API。
// 環境変数 ADMIN_SECRET と一致する秘密の文字列を渡した時だけ動作する(知らない人には使えない)。
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { deviceId, secret, amount } = req.body || {};
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: "権限がありません" });
    return;
  }
  if (!deviceId || typeof deviceId !== "string") {
    res.status(400).json({ error: "deviceIdが必要です" });
    return;
  }
  const add = Number(amount) > 0 ? Math.floor(Number(amount)) : 10; // 未指定なら10クレジット付与
  try {
    const newTotal = await redis.incrby(`credits:${deviceId}`, add);
    res.status(200).json({ credits: newTotal });
  } catch (e) {
    res.status(500).json({ error: `付与に失敗しました: ${e.message}` });
  }
}
