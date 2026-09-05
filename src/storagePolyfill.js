// アーティファクト専用の window.storage API を、通常のブラウザでも動く形で再現するシム。
// 元のゲームコード(App.jsx)側は一切変更せず、そのまま window.storage.get/set/delete/list を呼び出せる。
// 「shared」の概念はスタンドアロン版では意味を持たないため、単純にキーのプレフィックスで区別するだけにしている。

function makeKey(key, shared) {
  return `jinro_${shared ? "shared" : "private"}_${key}`;
}

function ensureKeyValid(key) {
  if (!key || /[\s/\\'"]/.test(key) || key.length > 200) {
    throw new Error("Invalid storage key");
  }
}

const storagePolyfill = {
  async get(key, shared = false) {
    ensureKeyValid(key);
    const raw = window.localStorage.getItem(makeKey(key, shared));
    if (raw === null) {
      // 元のアーティファクト仕様に合わせ、存在しないキーはエラーを投げる(nullを返さない)
      throw new Error(`Key not found: ${key}`);
    }
    return { key, value: raw, shared };
  },

  async set(key, value, shared = false) {
    ensureKeyValid(key);
    if (typeof value !== "string") value = JSON.stringify(value);
    if (value.length > 5 * 1024 * 1024) {
      throw new Error("Value exceeds 5MB limit");
    }
    window.localStorage.setItem(makeKey(key, shared), value);
    return { key, value, shared };
  },

  async delete(key, shared = false) {
    ensureKeyValid(key);
    window.localStorage.removeItem(makeKey(key, shared));
    return { key, deleted: true, shared };
  },

  async list(prefix = "", shared = false) {
    const fullPrefix = makeKey(prefix, shared);
    const basePrefix = makeKey("", shared);
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(fullPrefix)) {
        keys.push(k.slice(basePrefix.length));
      }
    }
    return { keys, prefix, shared };
  },
};

if (typeof window !== "undefined" && !window.storage) {
  window.storage = storagePolyfill;
}

export default storagePolyfill;
