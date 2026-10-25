/* =========================================================
   Utilidades de texto e datas
   ========================================================= */

export function shorten(text, max = 40) {
  const s = String(text ?? "");
  return s.length > max ? s.slice(0, max) + "…" : s;
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function uniq(arr) {
  return [...new Set(arr)];
}

/** Id único (usa crypto quando disponível). */
export function uid() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

/** Minúsculas e sem acentos — para buscas ("funcao" encontra "função"). */
export function normalize(s) {
  return String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------- datas ---------- */
const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

/** "2026-09-30" no fuso local. */
export function dayKey(date = new Date()) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

export function lastNDays(n) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({ key: dayKey(d), label: WEEKDAYS[d.getDay()] });
  }
  return out;
}

/** Dias seguidos com atividade. Hoje ainda sem atividade não zera a sequência. */
export function calcStreak(daysMap) {
  const d = new Date();
  if (!daysMap[dayKey(d)]) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (daysMap[dayKey(d)]) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "agora mesmo";
  if (s < 3600) return Math.floor(s / 60) + " min atrás";
  if (s < 86400) return Math.floor(s / 3600) + " h atrás";
  const days = Math.floor(s / 86400);
  return days === 1 ? "ontem" : days + " dias atrás";
}
