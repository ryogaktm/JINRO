// Stripeからの決済完了通知(Webhook)を受け取り、該当する端末にクレジットを1つ付与する。
// 署名検証のため、Vercelの自動bodyParserを無効化し、生のリクエストボディをそのまま使う。
import Stripe from "stripe";
import { Redis } from "@upstash/redis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const redis = Redis.fromEnv();

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const sig = req.headers["stripe-signature"];
  const rawBody = await readRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    // 署名検証に失敗したリクエストは、なりすましの可能性があるため処理せず拒否する
    res.status(400).json({ error: `Webhook署名検証エラー: ${e.message}` });
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const deviceId = session.metadata?.deviceId;
    if (deviceId) {
      try {
        await redis.incr(`credits:${deviceId}`);
      } catch (e) {
        // ここで失敗すると入金されたのにクレジットが付与されないため、
        // Stripe側にエラーを返して再送してもらう(Stripeはwebhookが失敗すると自動的にリトライする)
        res.status(500).json({ error: `クレジット付与に失敗しました: ${e.message}` });
        return;
      }
    }
  }

  res.status(200).json({ received: true });
}
