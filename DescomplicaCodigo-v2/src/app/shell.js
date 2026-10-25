/* =========================================================
   "Casca" do app: tema claro/escuro e menu lateral.
   (O tema salvo já é aplicado por um script inline no <head>.)
   ========================================================= */
import { $ } from "../core/dom.js";
import { store } from "../core/storage.js";
import { icon } from "../ui/icons.js";

/* ---------- Tema ---------- */
export function getTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  store.set("theme", theme);
  renderThemeButton();
}

function renderThemeButton() {
  const btn = $("#themeToggle");
  const dark = getTheme() === "dark";
  const label = dark ? "Mudar para tema claro" : "Mudar para tema escuro";
  btn.innerHTML = icon(dark ? "sun" : "moon");
  btn.setAttribute("aria-label", label);
  btn.title = label;
}

/* ---------- Menu lateral ---------- */
function setMobileNav(open) {
  document.body.classList.toggle("nav-open", open);
  $("#menuBtn").setAttribute("aria-expanded", String(open));
}

export function initShell() {
  renderThemeButton();
  $("#themeToggle").addEventListener("click", () => setTheme(getTheme() === "dark" ? "light" : "dark"));

  if (store.get("collapsed", false)) document.body.classList.add("sidebar-collapsed");
  $("#collapseBtn").addEventListener("click", () => {
    const collapsed = document.body.classList.toggle("sidebar-collapsed");
    store.set("collapsed", collapsed);
  });

  $("#menuBtn").addEventListener("click", () => setMobileNav(!document.body.classList.contains("nav-open")));
  $("#backdrop").addEventListener("click", () => setMobileNav(false));
  window.addEventListener("hashchange", () => setMobileNav(false));
}
