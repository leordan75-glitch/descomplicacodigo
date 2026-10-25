/* =========================================================
   Tela: Dashboard (lê as estatísticas de app/activity.js)
   ========================================================= */
import { $, esc } from "../core/dom.js";
import { lastNDays, calcStreak } from "../core/text.js";
import { langLabel } from "../data/languages.js";
import { icon } from "../ui/icons.js";
import { getActivity } from "../app/activity.js";
import { onEnter } from "../app/router.js";
import { doneExercises } from "./exercises.js";

function render() {
  const a = getActivity();
  const langs = Object.entries(a.langs).sort((x, y) => y[1] - x[1]);
  const topLang = langs.length ? langLabel(langs[0][0]) : "—";

  const stats = [
    { ico: "chat", label: "Dúvidas resolvidas", val: a.answers },
    { ico: "target", label: "Exercícios concluídos", val: doneExercises().length, accent: true },
    { ico: "flame", label: "Dias seguidos", val: calcStreak(a.days) },
    { ico: "book", label: "Temas estudados", val: Object.keys(a.topics).length, accent: true },
    { ico: "code", label: "Linguagem mais estudada", val: topLang, small: true },
  ];
  $("#statGrid").innerHTML = stats.map((s) => `
    <div class="stat${s.accent ? " stat--accent" : ""}">
      <div class="stat__ico">${icon(s.ico)}</div>
      <div class="stat__val${s.small ? " stat__val--sm" : ""}">${esc(s.val)}</div>
      <div class="stat__label">${esc(s.label)}</div>
    </div>`).join("");

  const week = lastNDays(7);
  const max = Math.max(1, ...week.map((d) => a.days[d.key] || 0));
  $("#weekBars").innerHTML = week.map((d) => {
    const v = a.days[d.key] || 0;
    const h = v ? Math.max(6, Math.round((v / max) * 100)) : 3;
    return `<div class="bar" title="${v} atividade(s)"><span class="bar__val">${v || ""}</span><div class="bar__fill${v ? "" : " bar__fill--empty"}" style="height:${h}%"></div><span class="bar__label">${d.label}</span></div>`;
  }).join("");

  const lb = $("#langBars");
  if (!langs.length) {
    lb.innerHTML = '<p class="muted">Estude na Biblioteca, faça exercícios ou perguntas para ver suas linguagens aqui.</p>';
    return;
  }
  const lmax = langs[0][1];
  lb.innerHTML = langs.slice(0, 6).map(([id, n]) => `
    <div class="langbar">
      <div class="langbar__top"><span>${esc(langLabel(id))}</span><span>${n}</span></div>
      <div class="langbar__track"><div class="langbar__fill" style="width:${Math.round((n / lmax) * 100)}%"></div></div>
    </div>`).join("");
}

export function initDashboard() {
  onEnter("dashboard", render);
}
