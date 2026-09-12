// Anthropic APIへの中継サーバーレス関数。
// APIキーはここ(サーバー側の環境変数)にだけ存在し、ブラウザには一切渡らない。

// ★ 重要:Vercelのサーバーレス関数は、明示的に指定しない限りHobby(無料)プランで
// デフォルト10秒でタイムアウトする。このゲームはプロンプトが大きく、AIの応答に
// 10秒以上かかることが珍しくないため、maxDurationを明示的に伸ばしておく
// (Hobbyプランでは最大60秒まで指定可能)。
export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY が設定されていません" });
    return;
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await upstream.text();
    res.status(upstream.status);
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (e) {
    res.status(502).json({ error: `中継サーバーでエラーが発生しました: ${e.message}` });
  }
}
