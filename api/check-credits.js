// クレジット残高確認と、開発者用のテストクレジット付与を1ファイルに統合したもの。
// 元は check-credits.js / add-test-credits.js の2ファイルだった。
// GET(deviceIdのみ)= 残高確認、POST(secret必須)= 開発者によるテスト付与。
import { Redis } from "@upstash/redis";

// VercelのUpstash連携が自動生成する変数名(KV_REST_API_URL/TOKEN)を直接指定する。
// Redis.fromEnv()は既定でUPSTASH_REDIS_REST_URL/TOKENという別名を探すため、
// 名前が一致せず接続できない問題があったので、ここで明示的に読みに行くようにしている。
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

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

// 管理者用:クーポンコードを新規発行する(1コードにつき1回だけ使える・指定したクレジット数分)。
function generateCouponCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 紛らわしい文字(0/O, 1/I等)は除く
  let code = "";
  for (let i = 0; i < 10; i++) {
    if (i > 0 && i % 5 === 0) code += "-";
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
async function handleGenerateCoupon(req, res) {
  const { secret, amount } = req.body || {};
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: "権限がありません" });
    return;
  }
  const validAmounts = [1, 5, 10];
  const amt = Number(amount);
  if (!validAmounts.includes(amt)) {
    res.status(400).json({ error: "amountは1・5・10のいずれかにしてください" });
    return;
  }
  try {
    const code = generateCouponCode();
    await redis.set(`coupon:${code}`, JSON.stringify({ amount: amt, used: false, createdAt: new Date().toISOString() }));
    await redis.sadd("coupon:index", code);
    res.status(200).json({ code, amount: amt });
  } catch (e) {
    res.status(500).json({ error: `発行に失敗しました: ${e.message}` });
  }
}

// プレイヤー用:クーポンコードを使ってクレジットを増やす(1コード1回のみ・秘密の合言葉は不要)。
async function handleRedeemCoupon(req, res) {
  const { deviceId, code } = req.body || {};
  if (!deviceId || typeof deviceId !== "string") {
    res.status(400).json({ error: "deviceIdが必要です" });
    return;
  }
  const cleanCode = (code || "").trim().toUpperCase();
  if (!cleanCode) {
    res.status(400).json({ error: "クーポンコードを入力してください" });
    return;
  }
  try {
    const key = `coupon:${cleanCode}`;
    const raw = await redis.get(key);
    if (!raw) {
      res.status(404).json({ error: "そのクーポンコードは見つかりませんでした" });
      return;
    }
    const coupon = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (coupon.used) {
      res.status(409).json({ error: "そのクーポンコードは既に使用済みです" });
      return;
    }
    coupon.used = true;
    coupon.usedAt = new Date().toISOString();
    coupon.usedBy = deviceId;
    await redis.set(key, JSON.stringify(coupon));
    const newTotal = await redis.incrby(`credits:${deviceId}`, coupon.amount);
    res.status(200).json({ credits: newTotal, amount: coupon.amount });
  } catch (e) {
    res.status(500).json({ error: `使用に失敗しました: ${e.message}` });
  }
}

// 管理者用:発行済みクーポンの一覧を返す(未使用・使用済みの管理用)。
async function handleListCoupons(req, res) {
  if (!process.env.ADMIN_SECRET || req.query.secret !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: "権限がありません" });
    return;
  }
  try {
    const codes = await redis.smembers("coupon:index");
    if (!codes || codes.length === 0) {
      res.status(200).json({ coupons: [] });
      return;
    }
    const raw = await redis.mget(...codes.map((c) => `coupon:${c}`));
    const coupons = codes.map((code, i) => {
      let parsed = null;
      try { parsed = typeof raw[i] === "string" ? JSON.parse(raw[i]) : raw[i]; } catch (e) {}
      if (!parsed) return null;
      return { code, ...parsed };
    }).filter(Boolean).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json({ coupons });
  } catch (e) {
    res.status(500).json({ error: `取得に失敗しました: ${e.message}` });
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.action === "list_coupons") return handleListCoupons(req, res);
    return handleCheck(req, res);
  }
  if (req.method === "POST") {
    const action = (req.body || {}).action;
    if (action === "generate_coupon") return handleGenerateCoupon(req, res);
    if (action === "redeem_coupon") return handleRedeemCoupon(req, res);
    return handleAddTest(req, res); // actionを指定しない場合は今まで通り(開発者用テスト付与)
  }
  res.status(405).json({ error: "Method not allowed" });
}
