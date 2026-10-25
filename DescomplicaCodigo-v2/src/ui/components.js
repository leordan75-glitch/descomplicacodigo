/* =========================================================
   Pequenos componentes que devolvem HTML (string).
   ========================================================= */
import { esc } from "../core/dom.js";
import { langLabel } from "../data/languages.js";
import { highlight } from "./highlight.js";
import { icon } from "./icons.js";

export function codeBlock(lang, code) {
  return `<div class="codeblock">
  <div class="codeblock__head">
    <span class="codeblock__lang">${esc(langLabel(lang))}</span>
    <button class="codeblock__btn" type="button" data-action="copy-code">${icon("copy")} Copiar</button>
  </div>
  <pre><code>${highlight(code, lang)}</code></pre>
</div>`;
}

/** type: "tip" | "ok" | "err". `inner` é HTML já seguro. */
export function callout(type, inner) {
  const ico = type === "err" ? "alert" : type === "ok" ? "check" : "sparkles";
  return `<div class="callout callout--${type}"><span>${icon(ico)}</span><div>${inner}</div></div>`;
}

export function emptyState({ ico, title, desc, button, nav }) {
  const btn = button ? `<a class="btn btn--primary" href="#${nav}" data-nav="${nav}">${esc(button)}</a>` : "";
  return `<div class="empty"><div class="empty__ico">${icon(ico)}</div><h3>${esc(title)}</h3><p>${esc(desc)}</p>${btn}</div>`;
}

/**
 * Item de lista com ação principal + botão de excluir opcional.
 * `attrs` vai no botão principal (ex.: 'data-open-conv="123"').
 */
export function listItem({ ico, title, tag = "", desc, attrs, delAttrs, delLabel = "Excluir" }) {
  const del = delAttrs
    ? `<button class="icon-btn list-item__del" type="button" ${delAttrs} aria-label="${esc(delLabel)}" title="${esc(delLabel)}">${icon("trash")}</button>`
    : "";
  const tagHtml = tag ? `<span class="list-item__tag">${esc(tag)}</span>` : "";
  return `<div class="list-item">
  <button class="list-item__main" type="button" ${attrs}>
    <span class="list-item__ico">${icon(ico)}</span>
    <span class="list-item__body"><span class="list-item__t">${esc(title)}${tagHtml}</span><span class="list-item__d">${esc(desc)}</span></span>
  </button>${del}
</div>`;
}
