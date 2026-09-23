// NPC分身候補を承認・却下する(開発者専用、ADMIN_SECRETで保護)。
// 承認時は、そのプレイログから性格の特徴と、印象的な発言を1つ、軽量なAI呼び出しで抽出し、
// 実際のゲームで使う「承認済みNPCプール」に追加する。
import { Redis } from "@upstash/redis";

// VercelのUpstash連携が自動生成する変数名(KV_REST_API_URL/TOKEN)を直接指定する。
// Redis.fromEnv()は既定でUPSTASH_REDIS_REST_URL/TOKENという別名を探すため、
// 名前が一致せず接続できない問題があったので、ここで明示的に読みに行くようにしている。
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});
const CLUBS = ["帰宅部", "図書委員会", "茶道部", "美術部", "軽音楽部", "調理部", "写真部", "園芸部", "応援団", "ボランティア部"];

async function extractPersonalityAndLine(content) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const system = `以下は人狼ゲーム1回分のプレイログです。このプレイヤーの言動から、次の2つを抽出してください。
①性格の特徴:人狼ゲームの登場人物として使える性格を、既存の登場人物の書き方(例:「毒舌だが面倒見がいい」「冷静なブレーンタイプ」「快活だが少し天然」)に合わせて、10〜15文字程度の短い日本語フレーズ1つ。
②印象的な発言:このプレイヤー自身(GMやNPCではない)が実際に発言した中から、その人らしさが一番出ている一言を、一字一句そのまま抜き出す(要約・言い換えはしない)。挨拶や短すぎる相槌ではなく、口癖・言い回し・決め台詞のように、他のプレイでも自然に再利用できる一言を選ぶ。適切なものが見つからなければ空文字でよい。
JSON形式のみで出力: {"personality":"性格の特徴","signatureLine":"実際の発言そのまま、または空文字"}`;
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: 300,
      thinking: { type: "disabled" },
      system,
      messages: [{ role: "user", content: `プレイログ:\n${content.slice(0, 8000)}` }],
    }),
  });
  const data = await resp.json();
  const text = data?.content?.find((b) => b.type === "text")?.text || "{}";
  const cleaned = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);
  return {
    personality: parsed.personality || "個性豊かなクラスメイト",
    signatureLine: (parsed.signatureLine || "").trim(),
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { key, action, secret } = req.body || {};
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: "権限がありません" });
    return;
  }
  if (!key || !["approve", "reject", "delete"].includes(action)) {
    res.status(400).json({ error: "keyとaction(approve/reject/delete)が必要です" });
    return;
  }
  try {
    if (action === "delete") {
      // 候補自体と、承認済みだった場合のプール枠(実際のゲームに登場する分)を両方消す。
      // 端末側のインデックス(npc_candidate:index)からも外し、二度と一覧に出てこないようにする。
      await redis.del(key);
      await redis.srem("npc_candidate:index", key);
      await redis.del(`npc_pool_entry:${key}`);
      await redis.srem("npc_pool:index", `npc_pool_entry:${key}`);
      res.status(200).json({ ok: true });
      return;
    }
    const raw = await redis.get(key);
    if (!raw) {
      res.status(404).json({ error: "候補が見つかりません" });
      return;
    }
    const candidate = typeof raw === "string" ? JSON.parse(raw) : raw;

    if (action === "reject") {
      candidate.status = "rejected";
      await redis.set(key, JSON.stringify(candidate));
      res.status(200).json({ ok: true });
      return;
    }

    // 承認:性格と印象的な発言を抽出し、実際のゲームで使う承認済みプールに追加する
    const { personality, signatureLine } = await extractPersonalityAndLine(candidate.content);
    const club = CLUBS[Math.floor(Math.random() * CLUBS.length)];
    const gender = Math.random() < 0.5 ? "男性" : "女性";
    const poolEntry = {
      name: candidate.nickname,
      age: 17,
      gender,
      personality,
      club,
      signatureLine: signatureLine || null,
      creatorDeviceId: candidate.deviceId || null,
      region: candidate.region === "en" ? "en" : "ja", // このキャラが元々どちらの地域(言語)のプレイで生まれたか
      approvedAt: new Date().toISOString(),
    };
    candidate.status = "approved";
    candidate.poolEntry = poolEntry;
    await redis.set(key, JSON.stringify(candidate));
    await redis.set(`npc_pool_entry:${key}`, JSON.stringify(poolEntry));
    await redis.sadd("npc_pool:index", `npc_pool_entry:${key}`);
    res.status(200).json({ ok: true, poolEntry });
  } catch (e) {
    res.status(500).json({ error: `処理に失敗しました: ${e.message}` });
  }
}
