// Cloudflare Pages Functions 用の入口。既存の api/get-npc-pool.js(Vercel形式)をそのまま呼び出す。
import { runVercelHandler } from "../_lib/compat.js";
export const onRequest = (context) => runVercelHandler(context, () => import("../../api/get-npc-pool.js"));
