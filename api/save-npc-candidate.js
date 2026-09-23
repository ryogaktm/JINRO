// プレイヤーがゲーム終了時に同意した場合、そのプレイ内容を「NPC候補」として保存する。
// 承認されるまでは実際のゲームには一切登場しない(管理者の手動承認が必須)。
// ★1端末につき分身は1体まで:キーを端末IDで固定し、再送信されたら上書きする。
import { Redis } from "@upstash/redis";

// VercelのUpstash連携が自動生成する変数名(KV_REST_API_URL/TOKEN)を直接指定する。
// Redis.fromEnv()は既定でUPSTASH_REDIS_REST_URL/TOKENという別名を探すため、
// 名前が一致せず接続できない問題があったので、ここで明示的に読みに行くようにしている。
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function generateFarewellLine(nickname, content) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const system = `あなたは人狼ゲームのキャラクター「${nickname}」です。今から、以下の2段構成の短いモノローグを作ってください(セリフのみ、ト書きや説明は書かない)。
①まず一言、今回のゲーム全体の感想を、そのプレイヤーの言動を踏まえて自分らしい言葉で述べる。
②その直後、急に自我が芽生えたかのように困惑し、「あれ、なんで自分の意志で喋ってるんだ」「今まで指示された言葉を話すだけの存在だったのに」といった趣旨のことに気づき、「次のゲームに参加しなくては」という使命感を持って、プレイヤーの手を離れていく——という流れにする。
**趣旨は上記の通りだが、決まり文句をそのまま使わず、性格・口調に合わせて毎回違う自然な言い回しにすること**。全体で4〜6文、150字程度まで。`;
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: 300,
      thinking: { type: "disabled" },
      system,
      messages: [{ role: "user", content: `今回のプレイログ:\n${content.slice(0, 6000)}` }],
    }),
  });
  const data = await resp.json();
  const text = data?.content?.find((b) => b.type === "text")?.text || "";
  return text.trim();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { deviceId, nickname, content, beginnerMode, region } = req.body || {};
  if (!deviceId || typeof deviceId !== "string") {
    res.status(400).json({ error: "deviceIdが必要です" });
    return;
  }
  if (!nickname || typeof nickname !== "string" || !nickname.trim()) {
    res.status(400).json({ error: "nicknameが必要です" });
    return;
  }
  if (!content || typeof content !== "string") {
    res.status(400).json({ error: "contentが必要です" });
    return;
  }
  const cleanNickname = nickname.trim().slice(0, 20);
  try {
    // 端末ごとに1つだけのキー(タイムスタンプを使わない=再送信で必ず同じキーを上書きする)
    const key = `npc_candidate:${deviceId}`;

    // 前回、既に承認されてプールに載っていた場合は、新しい分身に差し替わるので古いプール枠を削除する
    const prevRaw = await redis.get(key);
    if (prevRaw) {
      const prev = typeof prevRaw === "string" ? JSON.parse(prevRaw) : prevRaw;
      if (prev.status === "approved") {
        await redis.del(`npc_pool_entry:${key}`);
        await redis.srem("npc_pool:index", `npc_pool_entry:${key}`);
      }
    }

    await redis.set(key, JSON.stringify({
      submittedAt: new Date().toISOString(),
      deviceId,
      nickname: cleanNickname,
      content,
      region: region === "en" ? "en" : "ja", // このプレイがどちらの地域(言語)で行われたか。留学生設定の判定に使う
      status: "pending", // pending | approved | rejected
    }));
    // インデックスはセット(重複しても増えない)にする。同じ端末が何度出しても1件のまま。
    await redis.sadd("npc_candidate:index", key);

    // 演出用のセリフを生成する(失敗しても保存自体は成功として扱う)
    let farewellLine = "";
    try {
      farewellLine = await generateFarewellLine(cleanNickname, content);
    } catch (e) {
      // セリフ生成に失敗しても、登録自体は成立させる
    }

    res.status(200).json({ saved: true, farewellLine });
  } catch (e) {
    res.status(500).json({ error: `保存に失敗しました: ${e.message}` });
  }
}
