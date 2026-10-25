/* =========================================================
   Utilidades de DOM
   ========================================================= */

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/** Escapa texto para inserir com segurança dentro de HTML. */
export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function stripTags(html) {
  return String(html ?? "").replace(/<[^>]+>/g, "");
}

/**
 * Delegação de eventos: um único listener no `root` que reage
 * a cliques (ou outro evento) em elementos que casam com `selector`.
 */
export function on(root, type, selector, handler) {
  root.addEventListener(type, (event) => {
    const el = event.target.closest(selector);
    if (el && root.contains(el)) handler(event, el);
  });
}

/** Ajusta a altura de um <textarea> ao conteúdo. */
export function autoGrow(textarea, max = 220) {
  textarea.style.height = "auto";
  textarea.style.height = Math.min(max, textarea.scrollHeight) + "px";
}
