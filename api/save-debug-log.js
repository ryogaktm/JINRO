// プレイヤーのデバッグログをサーバー(Redis)に自動保存する。開発者のデバッグ用途。
// ゲーム終了時にフロントエンドから自動的に呼ばれる(プレイヤーの操作は不要)。
//
// 保存件数の管理ルール:
// - 上限はMAX_LOGS件(通常ログ・お気に入りログ合わせて)。
// - 新規に保存されるログは favorite: false でスタートする(=通常ログ、古くなったら自動削除の対象)。
// - 管理画面(toggle-debug-log-favorite)で「お気に入り」登録されたログ(favorite: true)は、
//   上限を超えても自動削除されない(ずっと保管される)。ただし枠自体はMAX_LOGSの中で共有する
//   (お気に入りだからといって上限の外に別枠が用意されるわけではない)。
// - この仕組みを導入する前に保存されていた既存ログ(favoriteフィールドが存在しない)は、
//   後方互換のため「保護扱い(=お気に入りと同様に自動削除しない)」として扱う。
// - 上限を超えた分は、古い順に「favorite: false が明示されている」ログだけを削除する。
//   削除できる対象が足りない(保護対象ばかりで埋まっている)場合は、データを失わないことを
//   優先し、一時的に上限を超えることを許容する。
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const MAX_LOGS = 20;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { deviceId, userName, content } = req.body || {};
  if (!content || typeof content !== "string") {
    res.status(400).json({ error: "contentが必要です" });
    return;
  }
  try {
    const id = `${Date.now()}_${(deviceId || "unknown").slice(0, 8)}`;
    const key = `debuglog:${id}`;
    await redis.set(key, JSON.stringify({
      savedAt: new Date().toISOString(),
      deviceId: deviceId || null,
      userName: userName || null,
      favorite: false,
      content,
    }));
    // 一覧用のインデックス(新しい順)に追加
    await redis.lpush("debuglog:index", key);

    // 上限を超えた分だけ、古い順に「お気に入りではない」ログを探して削除する
    const allKeys = await redis.lrange("debuglog:index", 0, -1);
    if (allKeys.length > MAX_LOGS) {
      let excess = allKeys.length - MAX_LOGS;
      const raw = await redis.mget(...allKeys);
      // 古い順(配列の末尾)から確認していく
      for (let i = allKeys.length - 1; i >= 0 && excess > 0; i--) {
        let parsed = null;
        try { parsed = typeof raw[i] === "string" ? JSON.parse(raw[i]) : raw[i]; } catch (e) {}
        // favoriteフィールドが存在しない(旧ログ)、またはtrueのものは保護対象なのでスキップ
        const isProtected = !parsed || parsed.favorite === true || parsed.favorite === undefined;
        if (isProtected) continue;
        await redis.del(allKeys[i]);
        await redis.lrem("debuglog:index", 1, allKeys[i]);
        excess--;
      }
      // excessが残った場合(保護対象ばかりで削除できなかった場合)は、そのまま上限超過を許容する
    }

    res.status(200).json({ saved: true, id });
  } catch (e) {
    res.status(500).json({ error: `保存に失敗しました: ${e.message}` });
  }
}
