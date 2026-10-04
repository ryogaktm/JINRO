// Cloudflare Pages Functions 用の入口。既存の api/list-npc-candidates.js(Vercel形式)をそのまま呼び出す。
import { runVercelHandler } from "../_lib/compat.js";
export const onRequest = (context) => runVercelHandler(context, () => import("../../api/list-npc-candidates.js"));
