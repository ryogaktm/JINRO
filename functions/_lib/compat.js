// Vercel形式のサーバーレス関数 handler(req, res) を、Cloudflare Pages Functions で動かすための互換レイヤー。
//
// 目的: api/ 配下の既存ロジックを一切書き換えずに Cloudflare へ移行する。
// やっていること:
//   1. Cloudflare の Request から、Vercel互換の req オブジェクト(method / query / body / headers / rawBody)を組み立てる
//   2. res.status().json() / res.send() / res.setHeader() を受け取り、最後に Cloudflare の Response に変換する
//   3. Cloudflare の環境変数(context.env)を process.env に流し込んでから handler を読み込む
//      (既存コードは process.env.XXX をモジュール読み込み時に参照しているため、読み込み前に用意しておく必要がある)
//
// 使い方(functions/api/xxx.js 側):
//   import { runVercelHandler } from "../_lib/compat.js";
//   export const onRequest = (context) => runVercelHandler(context, () => import("../../api/xxx.js"));

function buildReq(request, url, rawBody) {
  // ヘッダー名は小文字で揃える(Vercel/Node の req.headers と同じ流儀)
  const headers = {};
  for (const [k, v] of request.headers.entries()) headers[k.toLowerCase()] = v;

  const query = {};
  for (const [k, v] of url.searchParams.entries()) query[k] = v;

  let body = undefined;
  const ct = (headers["content-type"] || "").toLowerCase();
  if (rawBody && rawBody.length > 0) {
    if (ct.includes("application/json")) {
      try { body = JSON.parse(rawBody); } catch (e) { body = undefined; }
    } else {
      body = rawBody;
    }
  }

  return { method: request.method, headers, query, body, rawBody, url: url.pathname + url.search };
}

function buildRes() {
  const state = { status: 200, headers: { "Content-Type": "application/json" }, body: "", ended: false };
  const res = {
    status(code) { state.status = code; return res; },
    setHeader(name, value) { state.headers[name] = value; return res; },
    json(obj) { state.headers["Content-Type"] = "application/json"; state.body = JSON.stringify(obj); state.ended = true; return res; },
    send(data) { state.body = typeof data === "string" ? data : JSON.stringify(data); state.ended = true; return res; },
    end(data) { if (data !== undefined) state.body = String(data); state.ended = true; return res; },
    _state: state,
  };
  return res;
}

function injectEnv(env) {
  // nodejs_compat フラグ有効時は process.env が存在するが、念のため無くても動くようにする
  if (typeof globalThis.process === "undefined") globalThis.process = { env: {} };
  if (!globalThis.process.env) globalThis.process.env = {};
  for (const [k, v] of Object.entries(env || {})) {
    if (typeof v === "string") globalThis.process.env[k] = v;
  }
}

export async function runVercelHandler(context, loadModule) {
  const { request, env } = context;
  injectEnv(env);

  // handler のモジュールは、環境変数を流し込んだ「後」に読み込む(トップレベルで process.env を読むコードがあるため)
  const mod = await loadModule();
  const handler = mod.default;

  const url = new URL(request.url);
  const rawBody = request.method === "GET" || request.method === "HEAD" ? "" : await request.text();
  const req = buildReq(request, url, rawBody);
  const res = buildRes();

  try {
    await handler(req, res);
  } catch (e) {
    if (!res._state.ended) {
      res.status(500).json({ error: `サーバー内部エラー: ${e?.message || String(e)}` });
    }
  }

  const { status, headers, body } = res._state;
  return new Response(body, { status, headers });
}
