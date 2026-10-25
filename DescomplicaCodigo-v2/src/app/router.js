/* =========================================================
   Navegação entre telas (SPA por hash: #inicio, #perguntar…)
   Qualquer elemento com data-nav="tela" troca de tela.
   O botão "voltar" do navegador funciona.
   ========================================================= */
import { $$, on } from "../core/dom.js";

const DEFAULT_VIEW = "inicio";
const hooks = {};
let views = {};

/** Registra uma função chamada sempre que a tela `name` for aberta. */
export function onEnter(name, fn) {
  (hooks[name] ||= []).push(fn);
}

export function currentView() {
  const name = location.hash.slice(1);
  return views[name] ? name : DEFAULT_VIEW;
}

export function navTo(name) {
  if (!views[name]) name = DEFAULT_VIEW;
  if (location.hash.slice(1) !== name) {
    location.hash = name; // dispara "hashchange" → show()
  } else {
    show(name);
  }
}

function show(name) {
  Object.entries(views).forEach(([key, el]) => el.classList.toggle("is-active", key === name));
  $$(".nav__item").forEach((a) => {
    if (a.dataset.nav === name) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.body.classList.remove("nav-open");
  window.scrollTo(0, 0);
  (hooks[name] || []).forEach((fn) => fn());
}

export function initRouter() {
  views = Object.fromEntries($$(".view").map((v) => [v.dataset.view, v]));
  on(document, "click", "[data-nav]", (e, el) => {
    e.preventDefault();
    navTo(el.dataset.nav);
  });
  window.addEventListener("hashchange", () => show(currentView()));
  show(currentView());
}
