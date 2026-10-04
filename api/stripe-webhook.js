// Stripeからの決済完了通知(Webhook)を受け取り、該当する端末にクレジットを1つ付与する。
// 署名検証のため、Vercelの自動bodyParserを無効化し、生のリクエストボディをそのまま使う。
import Stripe from "stripe";
import { Redis } from "@upstash/redis";

// Cloudflare(Workers)には Node の http/crypto が無いため、fetch ベースの HTTP クライアントと
// Web Crypto ベースの署名検証プロバイダを明示する。(Vercel/Node 上でもこの指定のまま動く)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });
const cryptoProvider = Stripe.createSubtleCryptoProvider();
// VercelのUpstash連携が自動生成する変数名(KV_REST_API_URL/TOKEN)を直接指定する。
// Redis.fromEnv()は既定でUPSTASH_REDIS_REST_URL/TOKENという別名を探すため、
// 名前が一致せず接続できない問題があったので、ここで明示的に読みに行くようにしている。
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// 生のリクエストボディ(署名検証に必要。1文字でも変わると検証に失敗する)。
// Cloudflare では互換レイヤー(functions/_lib/compat.js)が req.rawBody に文字列で入れてくれる。
// 万一 rawBody が無い環境(素の Node)では、従来どおりストリームから読む。
async function readRawBody(req) {
  if (typeof req.rawBody === "string") return req.rawBody;
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
    event = await stripe.webhooks.constructEventAsync(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET, undefined, cryptoProvider);
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
