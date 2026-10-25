/* =========================================================
   Busca global (topo). Atalho: tecla "/".
   ↑/↓ navegam nos resultados, Enter abre, Esc fecha.
   Ignora acentos: "funcao" encontra "função".
   ========================================================= */
import { $, $$, on, esc, stripTags } from "../core/dom.js";
import { normalize, shorten } from "../core/text.js";
import { LIBRARY } from "../data/library.js";
import { EXERCISES, LEVELS } from "../data/exercises.js";
import { ERRORS } from "../data/errors.js";
import { langLabel } from "../data/languages.js";
import { icon } from "../ui/icons.js";
import { emptyState, listItem } from "../ui/components.js";
import { openModal } from "../ui/overlay.js";
import { errorBody } from "../ai/responses.js";
import { navTo, onEnter } from "../app/router.js";
import { openTopic } from "./library.js";
import { focusExercise } from "./exercises.js";

let INDEX = [];
let lastQuery = "";
let activeIdx = -1;

function buildIndex() {
  const levelLabel = (id) => LEVELS.find((l) => l.id === id)?.label || id;
  return [
    ...LIBRARY.map((l) => ({
      type: "Biblioteca", title: l.title, desc: l.summary,
      text: [l.title, l.summary, l.cat, stripTags(l.body), l.example.lang].join(" "),
      run: () => openTopic(l.id),
    })),
    ...EXERCISES.map((e) => ({
      type: "Exercício", title: e.title, desc: `${levelLabel(e.level)} • ${langLabel(e.lang)} — ${stripTags(e.statement)}`,
      text: [e.title, stripTags(e.statement), e.level, levelLabel(e.level), langLabel(e.lang)].join(" "),
      run: () => focusExercise(e.id),
    })),
    ...ERRORS.map((er) => ({
      type: "Erro", title: er.name, desc: er.simple,
      text: [er.name, er.simple, er.lang, er.keys.join(" ")].join(" "),
      run: () => openModal(`<h2>${icon("alert")} ${esc(er.name)}</h2><p class="lead">${esc(er.lang)}</p>` + errorBody(er)),
    })),
  ].map((it) => ({ ...it, haystack: normalize(it.text) }));
}

/** Todas as palavras digitadas precisam aparecer (em qualquer ordem). */
function search(q) {
  const words = normalize(q).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return INDEX
    .filter((it) => words.every((w) => it.haystack.includes(w)))
    .sort((a, b) => Number(normalize(b.title).includes(words[0])) - Number(normalize(a.title).includes(words[0])));
}

/* ---------- Dropdown ---------- */
const input = () => $("#globalSearch");
const box = () => $("#searchResults");

function closeDropdown() {
  box().hidden = true;
  input().setAttribute("aria-expanded", "false");
  activeIdx = -1;
}

function renderDropdown(q) {
  const results = search(q).slice(0, 7);
  activeIdx = -1;
  if (!q.trim()) { closeDropdown(); return; }
  box().hidden = false;
  input().setAttribute("aria-expanded", "true");
  box().innerHTML = results.length
    ? results.map((it) => `
      <button class="sr-item" type="button" role="option" data-si="${INDEX.indexOf(it)}">
        <span class="sr-item__tag">${esc(it.type)}</span>
        <span class="sr-item__body"><span class="sr-item__t">${esc(it.title)}</span><span class="sr-item__d">${esc(shorten(it.desc, 70))}</span></span>
      </button>`).join("")
    : `<div class="sr-empty">Nada encontrado para “${esc(q)}”.</div>`;
}

function moveActive(delta) {
  const items = $$(".sr-item", box());
  if (!items.length) return;
  activeIdx = (activeIdx + delta + items.length) % items.length;
  items.forEach((el, i) => el.classList.toggle("is-active", i === activeIdx));
  items[activeIdx].scrollIntoView({ block: "nearest" });
}

function runItem(i) {
  const it = INDEX[i];
  if (!it) return;
  closeDropdown();
  input().value = "";
  input().blur();
  it.run();
}

/* ---------- Página de resultados ---------- */
function renderPage() {
  const results = search(lastQuery);
  $("#searchSummary").textContent = lastQuery
    ? `${results.length} resultado(s) para “${lastQuery}”`
    : "Digite algo na busca do topo e pressione Enter.";
  $("#searchPage").innerHTML = results.length
    ? results.map((it) => listItem({ ico: "search", title: it.title, tag: it.type, desc: it.desc, attrs: `data-si="${INDEX.indexOf(it)}"` })).join("")
    : lastQuery ? emptyState({ ico: "search", title: "Nada encontrado", desc: "Tente outra palavra, como “loop”, “erro” ou “Python”." }) : "";
}

export function initSearch() {
  INDEX = buildIndex();
  const inp = input();

  inp.addEventListener("input", () => renderDropdown(inp.value));
  inp.addEventListener("focus", () => { if (inp.value.trim()) renderDropdown(inp.value); });
  inp.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); moveActive(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moveActive(-1); }
    else if (e.key === "Escape") { closeDropdown(); inp.blur(); }
    else if (e.key === "Enter") {
      e.preventDefault();
      const active = $$(".sr-item", box())[activeIdx];
      if (active) { runItem(Number(active.dataset.si)); return; }
      if (!inp.value.trim()) return;
      lastQuery = inp.value.trim();
      closeDropdown();
      inp.blur();
      navTo("busca");
      renderPage();
    }
  });

  on(box(), "click", "[data-si]", (e, el) => runItem(Number(el.dataset.si)));
  on($("#searchPage"), "click", "[data-si]", (e, el) => runItem(Number(el.dataset.si)));
  document.addEventListener("click", (e) => { if (!e.target.closest(".search")) closeDropdown(); });

  // atalho "/" para focar a busca
  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement?.tagName;
    if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT" && $("#modal").hidden) {
      e.preventDefault();
      inp.focus();
    }
  });

  onEnter("busca", renderPage);
}
