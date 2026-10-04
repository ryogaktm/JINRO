// Cloudflare Pages Functions 用の入口。既存の api/check-credits.js(Vercel形式)をそのまま呼び出す。
import { runVercelHandler } from "../_lib/compat.js";
export const onRequest = (context) => runVercelHandler(context, () => import("../../api/check-credits.js"));
