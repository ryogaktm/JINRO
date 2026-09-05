// Vercelのサーバーレス関数として動作する、Anthropic APIへの中継エンドポイント。
// ブラウザからは /api/claude というURLだけが見え、実際のAPIキーはここ(サーバー側)にしか存在しない。
// APIキーは Vercel のプロジェクト設定 > Environment Variables で ANTHROPIC_API_KEY として登録する。

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY が設定されていません(サーバー側の環境変数を確認してください)" });
    return;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Anthropic API への中継に失敗しました", message: err.message });
  }
}
