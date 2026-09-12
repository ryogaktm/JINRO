// window.storage を、通常のブラウザの localStorage で再現する互換レイヤー。
// アーティファクト環境専用の永続化APIを、一般的なブラウザでも同じインターフェースで使えるようにする。
// App.jsx 側のコードは一切変更せずに動く。

function buildKey(key, shared) {
  return `jinro_storage_${shared ? "shared" : "personal"}_${key}`;
}

window.storage = {
  async get(key, shared = false) {
    const raw = localStorage.getItem(buildKey(key, shared));
    if (raw === null) {
      throw new Error(`Key not found: ${key}`);
    }
    return { key, value: raw, shared };
  },

  async set(key, value, shared = false) {
    localStorage.setItem(buildKey(key, shared), value);
    return { key, value, shared };
  },

  async delete(key, shared = false) {
    const k = buildKey(key, shared);
    const existed = localStorage.getItem(k) !== null;
    localStorage.removeItem(k);
    return { key, deleted: existed, shared };
  },

  async list(prefix = "", shared = false) {
    const fullPrefix = buildKey(prefix, shared);
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(fullPrefix)) {
        keys.push(k.replace(buildKey("", shared), ""));
      }
    }
    return { keys, prefix, shared };
  },
};
