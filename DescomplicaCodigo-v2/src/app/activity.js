/* =========================================================
   Estatísticas de estudo (alimentam o Dashboard).
   langs  → só ids de linguagem ("javascript", "python"…)
   topics → ids de temas da Biblioteca abertos
   ========================================================= */
import { store } from "../core/storage.js";
import { dayKey } from "../core/text.js";
import { isKnownLang } from "../data/languages.js";

const VERSION = 2;

function empty() {
  return { v: VERSION, days: {}, langs: {}, topics: {}, answers: 0 };
}

export function getActivity() {
  const saved = store.get("activity", null);
  if (!saved) return empty();
  if (saved.v === VERSION) return saved;
  // dados da versão antiga: mantém dias e total, descarta linguagens misturadas
  return { ...empty(), days: saved.days || {}, answers: saved.answers || 0 };
}

function bump(map, key) {
  map[key] = (map[key] || 0) + 1;
}

/** Uma pergunta respondida no chat. */
export function recordAnswer(lang) {
  const a = getActivity();
  bump(a.days, dayKey());
  a.answers += 1;
  if (isKnownLang(lang)) bump(a.langs, lang);
  store.set("activity", a);
}

/** Estudo na Biblioteca ou exercício concluído. */
export function recordStudy({ lang, topic } = {}) {
  const a = getActivity();
  bump(a.days, dayKey());
  if (isKnownLang(lang)) bump(a.langs, lang);
  if (topic) bump(a.topics, topic);
  store.set("activity", a);
}
