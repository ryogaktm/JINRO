// クレジット残高確認と、開発者用のテストクレジット付与を1ファイルに統合したもの。
// 元は check-credits.js / add-test-credits.js の2ファイルだった。
// GET(deviceIdのみ)= 残高確認、POST(secret必須)= 開発者によるテスト付与。
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

async function handleCheck(req, res) {
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

// 開発者がテストプレイ用に、実際の決済を挟まずクレジットを付与する。
// 環境変数 ADMIN_SECRET と一致する秘密の文字列を渡した時だけ動作する(知らない人には使えない)。
async function handleAddTest(req, res) {
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

export default async function handler(req, res) {
  if (req.method === "GET") return handleCheck(req, res);
  if (req.method === "POST") return handleAddTest(req, res);
  res.status(405).json({ error: "Method not allowed" });
}
