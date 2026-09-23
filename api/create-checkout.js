// Stripe Checkoutのセッションを作成し、決済ページのURLを返す。
// deviceIdをmetadataに含めておき、決済完了時のwebhookでどの端末にクレジットを付与するか特定する。
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1プレイあたりの価格(税込・円)。変更したい場合はここだけ直せばよい。
const PRICE_JPY = 450;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { deviceId } = req.body || {};
  if (!deviceId || typeof deviceId !== "string") {
    res.status(400).json({ error: "deviceIdが必要です" });
    return;
  }

  try {
    // リクエストのOriginを使って、決済完了後に同じサイトへ戻す
    const origin = req.headers.origin || `https://${req.headers.host}`;

    // ★payment_method_types(支払い方法の明示指定)は指定しない。
    // ★Managed Payments(Stripeアカウント側の既定機能)は、税コードの設定が別途必要になり複雑なため、
    //   このチェックアウトセッションだけ明示的に無効化する(エラーメッセージが案内している対処法)。
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      managed_payments: { enabled: false },
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: "AI人狼 1プレイ分クレジット",
              description: "AIキャラクターと遊べる人狼ゲームを1回プレイできます",
            },
            unit_amount: PRICE_JPY,
          },
          quantity: 1,
        },
      ],
      metadata: { deviceId },
      success_url: `${origin}/?purchase=success`,
      cancel_url: `${origin}/?purchase=cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: `決済セッションの作成に失敗しました: ${e.message}` });
  }
}
