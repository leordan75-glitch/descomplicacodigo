/* =========================================================
   Modal (com foco preso e Esc) e Toast.
   ========================================================= */
import { $, on, esc } from "../core/dom.js";
import { icon, renderIcons } from "./icons.js";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
let lastFocus = null;

export function openModal(html) {
  const modal = $("#modal");
  const card = $(".modal__card", modal);
  const content = $("#modalContent");
  content.innerHTML = html;
  renderIcons(content);

  const heading = content.querySelector("h2");
  card.setAttribute("aria-label", heading ? heading.textContent.trim() : "Janela");

  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  card.scrollTop = 0;
  card.focus();
}

export function closeModal() {
  const modal = $("#modal");
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocus?.focus?.();
}

export function initModal() {
  const modal = $("#modal");
  on(modal, "click", "[data-close]", () => closeModal());
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.stopPropagation(); closeModal(); return; }
    if (e.key !== "Tab") return;
    const items = [...modal.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const lastEl = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === $(".modal__card", modal))) {
      e.preventDefault(); lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault(); first.focus();
    }
  });
}

/* ---------- Toast ---------- */
let toastTimer;
export function toast(message) {
  const t = $("#toast");
  t.hidden = false;
  t.innerHTML = icon("check") + `<span>${esc(message)}</span>`;
  requestAnimationFrame(() => t.classList.add("is-show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.remove("is-show");
    setTimeout(() => { t.hidden = true; }, 300);
  }, 2200);
}

/* ---------- Copiar ---------- */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch { /* sem suporte */ }
    ta.remove();
  }
  toast("Copiado! 📋");
}
