/* =========================================================
   Persistência local com dados pessoais separados por Firebase UID.
   Preferências visuais continuam compartilhadas no navegador.
   ========================================================= */
const PREFIX = "dc_";
const ACTIVE_USER_KEY = `${PREFIX}active_uid`;
const USER_DATA_KEYS = new Set([
  "history",
  "favorites",
  "exercises_done",
  "exercise_drafts",
  "activity",
]);

function readActiveUserId() {
  try {
    return localStorage.getItem(ACTIVE_USER_KEY) || null;
  } catch {
    return null;
  }
}

let activeUserId = readActiveUserId();

function storageKey(key) {
  if (!USER_DATA_KEYS.has(key)) return PREFIX + key;
  const scope = activeUserId ? `user_${encodeURIComponent(activeUserId)}` : "guest";
  return `${PREFIX}${scope}_${key}`;
}

export const store = {
  setUserScope(uid) {
    const nextUserId = typeof uid === "string" && uid ? uid : null;
    if (activeUserId === nextUserId) return false;
    activeUserId = nextUserId;
    try {
      if (activeUserId) localStorage.setItem(ACTIVE_USER_KEY, activeUserId);
      else localStorage.removeItem(ACTIVE_USER_KEY);
    } catch {
      /* o app ainda pode funcionar enquanto esta aba estiver aberta */
    }
    return true;
  },

  get(key, fallback) {
    try {
      const raw = localStorage.getItem(storageKey(key));
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(storageKey(key), JSON.stringify(value));
    } catch {
      /* armazenamento cheio ou bloqueado: o app continua funcionando */
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(storageKey(key));
    } catch {
      /* idem */
    }
  },
};
