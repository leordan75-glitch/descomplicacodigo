/* =========================================================
   Tela: Biblioteca
   ========================================================= */
import { $, $$, on, esc } from "../core/dom.js";
import { uniq } from "../core/text.js";
import { LIBRARY } from "../data/library.js";
import { codeBlock } from "../ui/components.js";
import { icon } from "../ui/icons.js";
import { openModal, closeModal } from "../ui/overlay.js";
import { recordStudy } from "../app/activity.js";
import { prefillChat } from "./chat.js";

const ALL = "Todos";
let activeCat = ALL;

function renderFilters() {
  const cats = [ALL, ...uniq(LIBRARY.map((l) => l.cat))];
  $("#libFilters").innerHTML = cats.map((c) =>
    `<button class="filter" type="button" data-cat="${esc(c)}" aria-pressed="${c === activeCat}">${esc(c)}</button>`).join("");
}

function renderGrid() {
  const list = activeCat === ALL ? LIBRARY : LIBRARY.filter((l) => l.cat === activeCat);
  $("#libGrid").innerHTML = list.map((l) => `
    <button class="lib-card" type="button" data-lib="${l.id}">
      <div class="lib-card__ico" aria-hidden="true">${l.ico}</div>
      <span class="lib-card__cat">${esc(l.cat)}</span>
      <h3>${esc(l.title)}</h3>
      <p>${esc(l.summary)}</p>
    </button>`).join("");
}

export function openTopic(id) {
  const item = LIBRARY.find((l) => l.id === id);
  if (!item) return;
  recordStudy({ topic: item.id, lang: item.example.lang });
  openModal(
    `<span class="cat">${esc(item.cat)}</span>` +
    `<h2>${item.ico} ${esc(item.title)}</h2>` +
    `<p class="lead">${esc(item.summary)}</p>` +
    item.body +
    "<h3>Exemplo prático</h3>" +
    codeBlock(item.example.lang, item.example.code) +
    `<div class="modal__actions"><button class="btn btn--primary btn--sm" type="button" data-ask-topic="${item.id}">${icon("chat")} Tirar uma dúvida sobre isso</button></div>`,
  );
}

export function initLibrary() {
  renderFilters();
  renderGrid();

  on($("#libFilters"), "click", "[data-cat]", (e, el) => {
    activeCat = el.dataset.cat;
    $$("#libFilters .filter").forEach((b) => b.setAttribute("aria-pressed", String(b === el)));
    renderGrid();
  });
  on($("#libGrid"), "click", "[data-lib]", (e, el) => openTopic(el.dataset.lib));
  on($("#modal"), "click", "[data-ask-topic]", (e, el) => {
    const item = LIBRARY.find((l) => l.id === el.dataset.askTopic);
    closeModal();
    prefillChat(`Explique esse código linha por linha:\n${item.example.code}`);
  });
}
