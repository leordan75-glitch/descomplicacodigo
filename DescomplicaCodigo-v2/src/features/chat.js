/* =========================================================
   Tela: Perguntar (chat) + histórico de conversas
   ========================================================= */
import { $, $$, on, esc, stripTags, autoGrow } from "../core/dom.js";
import { store } from "../core/storage.js";
import { shorten, uid, wait, timeAgo } from "../core/text.js";
import { LANGUAGES } from "../data/languages.js";
import { PROMPT_CHIPS } from "../data/home.js";
import { generateAnswer } from "../ai/index.js";
import { icon } from "../ui/icons.js";
import { callout, emptyState, listItem } from "../ui/components.js";
import { openModal, toast, copyText } from "../ui/overlay.js";
import { navTo, onEnter } from "../app/router.js";
import { recordAnswer } from "../app/activity.js";
import { isFavorite, toggleFavorite } from "./favorites.js";

const MAX_HISTORY = 100;
let conv = null;     // conversa atual { id, title, ts, messages[] }
let busy = false;    // evita enviar duas perguntas ao mesmo tempo
const byId = new Map(); // id da mensagem → mensagem (para copiar/favoritar)

/* ---------- Conversa ---------- */
function newConv() {
  conv = { id: uid(), title: "", ts: Date.now(), messages: [] };
}

function clearChat() {
  $$("#chatScroll .msg").forEach((m) => m.remove());
  $("#chatWelcome").hidden = false;
  byId.clear();
}

function listHistory() {
  return store.get("history", []);
}

function saveConv() {
  if (!conv.messages.length) return;
  const hist = listHistory().filter((c) => c.id !== conv.id);
  hist.unshift({ id: conv.id, title: conv.title || "Conversa", ts: Date.now(), messages: conv.messages });
  store.set("history", hist.slice(0, MAX_HISTORY));
}

/* ---------- Renderização das mensagens ---------- */
function scrollToBottom() {
  const s = $("#chatScroll");
  s.scrollTop = s.scrollHeight;
}

function append(el) {
  $("#chatWelcome").hidden = true;
  $("#chatScroll").appendChild(el);
  scrollToBottom();
  return el;
}

function renderUserMessage(msg) {
  const el = document.createElement("div");
  el.className = "msg msg--user";
  el.innerHTML = `<div class="msg__avatar">${icon("user")}</div><div class="msg__body"><div class="msg__name">Você</div><div class="msg__text"></div></div>`;
  el.querySelector(".msg__text").textContent = msg.text;
  append(el);
}

function favButton(id) {
  const on = isFavorite(id);
  return `<button class="msg__action" type="button" data-action="fav-msg" data-msg="${id}" aria-pressed="${on}">${icon("star")} ${on ? "Favoritado" : "Favoritar"}</button>`;
}

function renderAiMessage(msg, { actions = true } = {}) {
  byId.set(msg.id, msg);
  const el = document.createElement("div");
  el.className = "msg msg--ai";
  el.innerHTML = `
    <div class="msg__avatar">${icon("sparkles")}</div>
    <div class="msg__body">
      <div class="msg__name">DescomplicaCódigo</div>
      <div class="rich">${msg.html}</div>
      ${actions ? `<div class="msg__actions">
        <button class="msg__action" type="button" data-action="copy-msg" data-msg="${msg.id}">${icon("copy")} Copiar</button>
        ${favButton(msg.id)}
      </div>` : ""}
    </div>`;
  append(el);
}

function renderTyping() {
  const el = document.createElement("div");
  el.className = "msg msg--ai";
  el.innerHTML = `<div class="msg__avatar">${icon("sparkles")}</div><div class="msg__body"><div class="msg__name">DescomplicaCódigo</div><div class="typing" aria-label="Digitando"><span></span><span></span><span></span></div></div>`;
  return append(el);
}

/* ---------- Envio ---------- */
async function send() {
  const input = $("#chatInput");
  const text = input.value.trim();
  if (!text || busy) return;

  busy = true;
  $("#sendBtn").disabled = true;
  if (!conv.title) conv.title = shorten(text.replace(/\s+/g, " "), 60);
  input.value = "";
  autoGrow(input);

  const userMsg = { id: uid(), role: "user", text };
  conv.messages.push(userMsg);
  renderUserMessage(userMsg);
  const typing = renderTyping();

  try {
    // pequena pausa "pensando" — pode remover quando ligar a IA real
    const [answer] = await Promise.all([
      generateAnswer(text, $("#langSelect").value),
      wait(500 + Math.min(700, text.length * 4)),
    ]);
    const aiMsg = { id: uid(), role: "ai", html: answer.html, plain: answer.plain, title: conv.title };
    typing.remove();
    conv.messages.push(aiMsg);
    renderAiMessage(aiMsg);
    recordAnswer(answer.lang);
    saveConv();
  } catch (err) {
    console.error(err);
    typing.remove();
    renderAiMessage({ id: uid(), html: callout("err", "<b>Não consegui responder agora.</b> Tente de novo em instantes.") }, { actions: false });
  } finally {
    busy = false;
    $("#sendBtn").disabled = false;
    input.focus();
  }
}

/* ---------- API pública ---------- */
export function startNewChat() {
  newConv();
  clearChat();
}

/** Abre o chat com um texto já digitado (usado pela Home e Biblioteca). */
export function prefillChat(text) {
  navTo("perguntar");
  const input = $("#chatInput");
  input.value = text;
  autoGrow(input);
  requestAnimationFrame(() => {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  });
}

export function openConversation(id) {
  const hist = listHistory();
  const saved = hist.find((c) => c.id === id);
  if (!saved) return;
  // conversas antigas podem não ter id por mensagem
  let changed = false;
  saved.messages.forEach((m) => { if (!m.id) { m.id = uid(); changed = true; } });
  if (changed) store.set("history", hist);

  conv = { id: saved.id, title: saved.title, ts: saved.ts, messages: saved.messages.slice() };
  navTo("perguntar");
  clearChat();
  conv.messages.forEach((m) => (m.role === "user" ? renderUserMessage(m) : renderAiMessage(m)));
  scrollToBottom();
}

/* ---------- Tela Histórico ---------- */
function renderHistory() {
  const hist = listHistory();
  const panel = $("#historyList");
  if (!hist.length) {
    panel.innerHTML = emptyState({ ico: "clock", title: "Nenhuma conversa ainda", desc: "Suas perguntas aparecerão aqui automaticamente.", button: "Fazer uma pergunta", nav: "perguntar" });
    return;
  }
  panel.innerHTML = hist.map((c) => listItem({
    ico: "chat", title: c.title,
    desc: `${timeAgo(c.ts)} • ${Math.ceil(c.messages.length / 2)} troca(s)`,
    attrs: `data-open-conv="${esc(c.id)}"`, delAttrs: `data-del-conv="${esc(c.id)}"`, delLabel: "Excluir conversa",
  })).join("");
}

function aiNoteModal() {
  openModal(
    `<h2>${icon("sparkles")} Como a IA está integrada</h2>` +
    "<p class='lead'>A plataforma funciona com respostas locais e previsíveis para oferecer uma experiência completa no projeto atual.</p>" +
    "<p>Para conectar uma API externa, mantenha a chave secreta no backend e substitua a implementação de <code>generateAnswer()</code> pelo <code>fetch</code> correspondente.</p>" +
    callout("tip", "O restante do app continua recebendo <code>{ html, plain, lang }</code> de forma padronizada."),
  );
}

/* ---------- Inicialização ---------- */
export function initChat() {
  newConv();

  $("#langSelect").insertAdjacentHTML("beforeend", LANGUAGES.map((l) => `<option value="${l.id}">${esc(l.label)}</option>`).join(""));

  $("#promptChips").innerHTML = PROMPT_CHIPS.map((p, i) =>
    `<button class="chip" type="button" data-chip="${i}">${icon(p.ico)}<span>${esc(p.text.split("\n")[0])}</span></button>`).join("");
  on($("#promptChips"), "click", "[data-chip]", (e, el) => prefillChat(PROMPT_CHIPS[Number(el.dataset.chip)].text));

  const input = $("#chatInput");
  input.addEventListener("input", () => autoGrow(input));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(); }
  });
  $("#composer").addEventListener("submit", (e) => { e.preventDefault(); send(); });
  $("#newChatBtn").addEventListener("click", () => { startNewChat(); toast("Nova conversa"); input.focus(); });

  on(document, "click", "[data-action='ai-note']", () => aiNoteModal());

  on($("#chatScroll"), "click", "[data-action='copy-msg']", (e, el) => {
    const msg = byId.get(el.dataset.msg);
    if (!msg) return;
    // copia o texto da resposta como aparece na tela (sem HTML)
    const rich = el.closest(".msg__body").querySelector(".rich");
    copyText((rich ? rich.innerText : stripTags(msg.html)).trim());
  });
  on($("#chatScroll"), "click", "[data-action='fav-msg']", (e, el) => {
    const msg = byId.get(el.dataset.msg);
    if (!msg) return;
    const nowOn = toggleFavorite(msg);
    el.setAttribute("aria-pressed", String(nowOn));
    el.innerHTML = `${icon("star")} ${nowOn ? "Favoritado" : "Favoritar"}`;
    toast(nowOn ? "Salvo nos favoritos ⭐" : "Removido dos favoritos");
  });

  onEnter("perguntar", () => requestAnimationFrame(() => input.focus()));

  // Histórico
  onEnter("historico", renderHistory);
  const hp = $("#historyList");
  on(hp, "click", "[data-open-conv]", (e, el) => openConversation(el.dataset.openConv));
  on(hp, "click", "[data-del-conv]", (e, el) => {
    const id = el.dataset.delConv;
    store.set("history", listHistory().filter((c) => c.id !== id));
    if (conv.id === id) startNewChat();
    renderHistory();
    toast("Conversa excluída");
  });
}
