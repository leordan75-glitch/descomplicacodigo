/* =========================================================
   Tela: Exercícios
   Cada exercício tem um editor onde o aluno digita o código.
   - Rascunho salvo automaticamente (por exercício)
   - JavaScript: botão Executar + correção automática
   - Qualquer linguagem: "Pedir ajuda" leva o código ao chat
   ========================================================= */
import { $, $$, on, esc } from "../core/dom.js";
import { store } from "../core/storage.js";
import { runJavaScript } from "../core/runner.js";
import { EXERCISES, LEVELS } from "../data/exercises.js";
import { langLabel } from "../data/languages.js";
import { codeBlock } from "../ui/components.js";
import { icon } from "../ui/icons.js";
import { toast } from "../ui/overlay.js";
import { recordStudy } from "../app/activity.js";
import { navTo } from "../app/router.js";
import { prefillChat } from "./chat.js";

let level = "facil";

export const doneExercises = () => store.get("exercises_done", []);
const levelLabel = (id) => (LEVELS.find((l) => l.id === id) || {}).label || id;
const findEx = (id) => EXERCISES.find((x) => x.id === id);
const canRun = (e) => e.lang === "javascript";

/* ---------- Rascunhos ---------- */
const drafts = () => store.get("exercise_drafts", {});
const codeOf = (e) => drafts()[e.id] ?? e.starter;
function saveDraft(id, code) {
  const d = drafts();
  if (code === findEx(id)?.starter) delete d[id];
  else d[id] = code;
  store.set("exercise_drafts", d);
}

/* ---------- Renderização ---------- */
function card(e, done) {
  const isDone = done.includes(e.id);
  const code = codeOf(e);
  const rows = Math.min(16, Math.max(4, code.split("\n").length + 1));
  const runBtn = canRun(e)
    ? `<button class="btn btn--primary btn--sm" type="button" data-run="${e.id}" title="Executar (Ctrl+Enter)">${icon("send")} Executar</button>`
    : "";
  return `
  <article class="ex-card${isDone ? " is-done" : ""}" id="ex-${e.id}">
    <div class="ex-card__head">
      <span class="ex-badge ex-badge--${e.level}">${esc(levelLabel(e.level))}</span>
      <h3>${esc(e.title)}</h3>
      <span class="ex-done">${icon("check")} Concluído</span>
    </div>
    <p class="ex-card__statement">${e.statement}</p>

    <div class="editor">
      <div class="editor__head">
        <label class="editor__lang" for="code-${e.id}">${esc(langLabel(e.lang))} — seu código</label>
        <button class="editor__reset" type="button" data-reset="${e.id}" title="Voltar ao código inicial">Restaurar</button>
      </div>
      <textarea class="editor__input" id="code-${e.id}" data-editor="${e.id}" rows="${rows}"
        spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off">${esc(code)}</textarea>
    </div>
    <pre class="ex-output" id="out-${e.id}" aria-live="polite" hidden></pre>

    <div class="ex-card__actions">
      ${runBtn}
      <button class="btn btn--soft btn--sm" type="button" data-help="${e.id}">${icon("chat")} Pedir ajuda</button>
      <button class="btn btn--soft btn--sm" type="button" data-show-sol="${e.id}" aria-expanded="false" aria-controls="sol-${e.id}">${icon("sparkles")} Ver resposta</button>
      <button class="btn btn--ghost btn--sm" type="button" data-toggle-done="${e.id}">${icon("check")} ${isDone ? "Desmarcar" : "Marcar como concluído"}</button>
    </div>
    ${canRun(e) ? "" : `<p class="ex-hint">Exercícios em ${esc(langLabel(e.lang))} não rodam no navegador. Escreva sua resposta e use <b>Pedir ajuda</b> ou <b>Ver resposta</b> para conferir.</p>`}
    <div class="ex-solution" id="sol-${e.id}" hidden></div>
  </article>`;
}

function render() {
  $$("#exTabs .tab").forEach((t) => t.setAttribute("aria-selected", String(t.dataset.level === level)));
  const done = doneExercises();
  $("#exList").innerHTML = EXERCISES.filter((e) => e.level === level).map((e) => card(e, done)).join("");
}

/* ---------- Executar e corrigir ---------- */
const normalizeOut = (s) => s.split("\n").map((l) => l.trim()).filter(Boolean).join("\n");

function showOutput(id, state, text) {
  const out = $(`#out-${id}`);
  out.hidden = false;
  out.className = `ex-output ex-output--${state}`;
  out.textContent = text;
}

async function run(id) {
  const e = findEx(id);
  const code = $(`#code-${id}`).value;
  const btn = $(`[data-run="${id}"]`);
  btn.disabled = true;
  showOutput(id, "info", "Executando…");

  const result = await runJavaScript(e.test ? `${code}\n${e.test}` : code);
  btn.disabled = false;

  const printed = result.out.join("\n");
  if (!result.ok) {
    const hint = result.blocked ? "" : "\n\nDica: clique em “Pedir ajuda” para eu explicar esse erro.";
    showOutput(id, "err", (printed ? printed + "\n\n" : "") + "❌ " + result.error + hint);
    return;
  }
  if (e.expected == null) {
    showOutput(id, "info", printed || "(nada foi mostrado no console)");
    return;
  }
  if (normalizeOut(printed) === normalizeOut(e.expected)) {
    showOutput(id, "ok", (printed ? printed + "\n\n" : "") + "✅ Resposta certa!");
    if (!doneExercises().includes(id)) markDone(id, true);
    return;
  }
  showOutput(id, "err",
    `Saída do seu código:\n${printed || "(nada foi mostrado — faltou um console.log?)"}\n\nEsperado:\n${e.expected}\n\n🤔 Quase! Compare as duas saídas e tente de novo.`);
}

/* ---------- Solução / concluído ---------- */
function toggleSolution(id, forceOpen = false) {
  const e = findEx(id);
  const box = $(`#sol-${id}`);
  const btn = $(`[data-show-sol="${id}"]`);
  if (!e || !box) return;
  const open = forceOpen || box.hidden;
  if (open && !box.innerHTML) {
    const alts = e.alternatives.length
      ? `<h4>${icon("layers")} Outras formas de resolver</h4>` + e.alternatives.map((code) => codeBlock(e.lang, code)).join("")
      : "";
    box.innerHTML =
      `<h4>${icon("check")} Solução</h4>` + codeBlock(e.lang, e.solution) +
      `<h4>${icon("sparkles")} Explicação</h4><p>${e.explanation}</p>` + alts;
  }
  box.hidden = !open;
  btn.setAttribute("aria-expanded", String(open));
  btn.innerHTML = `${icon("sparkles")} ${open ? "Esconder resposta" : "Ver resposta"}`;
}

/** Marca como concluído sem redesenhar a lista (mantém o que o aluno está vendo). */
function markDone(id, byRun = false) {
  const done = doneExercises();
  if (done.includes(id)) return;
  done.push(id);
  store.set("exercises_done", done);
  recordStudy({ lang: findEx(id)?.lang });
  const cardEl = $(`#ex-${id}`);
  cardEl?.classList.add("is-done");
  const btn = $(`[data-toggle-done="${id}"]`);
  if (btn) btn.innerHTML = `${icon("check")} Desmarcar`;
  toast(byRun ? "Acertou! Exercício concluído 🎯" : "Exercício concluído! 🎯");
}

function toggleDone(id) {
  const done = doneExercises();
  const i = done.indexOf(id);
  if (i < 0) { markDone(id); return; }
  done.splice(i, 1);
  store.set("exercises_done", done);
  $(`#ex-${id}`)?.classList.remove("is-done");
  $(`[data-toggle-done="${id}"]`).innerHTML = `${icon("check")} Marcar como concluído`;
  toast("Exercício desmarcado");
}

/** Usado pela busca: abre a aba certa, rola até o exercício e mostra a solução. */
export function focusExercise(id) {
  const e = findEx(id);
  if (!e) return;
  level = e.level;
  navTo("exercicios");
  render();
  const el = $(`#ex-${id}`);
  if (!el) return;
  el.classList.add("is-highlight");
  // espera a troca de tela (hashchange) terminar antes de rolar
  setTimeout(() => { el.scrollIntoView({ behavior: "smooth", block: "center" }); $(`#code-${id}`)?.focus({ preventScroll: true }); }, 60);
  setTimeout(() => el.classList.remove("is-highlight"), 1800);
}

/* ---------- Editor: Tab indenta, Ctrl+Enter executa ---------- */
function onEditorKey(e) {
  const ta = e.target;
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    const ex = findEx(ta.dataset.editor);
    if (canRun(ex)) run(ex.id);
    return;
  }
  if (e.key === "Tab" && !e.shiftKey) {
    e.preventDefault();
    ta.setRangeText("  ", ta.selectionStart, ta.selectionEnd, "end");
    ta.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }
  if (e.key === "Enter" && !e.shiftKey) {
    // mantém a indentação da linha atual (e aumenta depois de "{" ou ":")
    const before = ta.value.slice(0, ta.selectionStart);
    const line = before.slice(before.lastIndexOf("\n") + 1);
    let indent = /^\s*/.exec(line)[0];
    if (/[{:[(]\s*$/.test(line)) indent += "  ";
    e.preventDefault();
    ta.setRangeText("\n" + indent, ta.selectionStart, ta.selectionEnd, "end");
    ta.dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (e.key === "Escape") ta.blur();
}

export function initExercises() {
  render();
  on($("#exTabs"), "click", "[data-level]", (e, el) => { level = el.dataset.level; render(); });

  const list = $("#exList");
  on(list, "click", "[data-show-sol]", (e, el) => toggleSolution(el.dataset.showSol));
  on(list, "click", "[data-toggle-done]", (e, el) => toggleDone(el.dataset.toggleDone));
  on(list, "click", "[data-run]", (e, el) => run(el.dataset.run));
  on(list, "click", "[data-help]", (e, el) => {
    const ex = findEx(el.dataset.help);
    const code = $(`#code-${ex.id}`).value;
    prefillChat(`Por que esse código não funciona? O exercício é: ${ex.title}.\n${code}`);
  });
  on(list, "click", "[data-reset]", (e, el) => {
    const ex = findEx(el.dataset.reset);
    const ta = $(`#code-${ex.id}`);
    ta.value = ex.starter;
    saveDraft(ex.id, ex.starter);
    $(`#out-${ex.id}`).hidden = true;
    ta.focus();
  });
  on(list, "input", "[data-editor]", (e, el) => saveDraft(el.dataset.editor, el.value));
  on(list, "keydown", "[data-editor]", (e) => onEditorKey(e));
}
