/* =========================================================
   Tela: Início
   ========================================================= */
import { $, on, esc } from "../core/dom.js";
import { HERO_CODE, FEATURES } from "../data/home.js";
import { LIBRARY } from "../data/library.js";
import { EXERCISES } from "../data/exercises.js";
import { LANGUAGES } from "../data/languages.js";
import { highlight } from "../ui/highlight.js";
import { icon } from "../ui/icons.js";
import { navTo } from "../app/router.js";
import { prefillChat } from "./chat.js";

export function initHome() {
  $("#heroCode").innerHTML = highlight(HERO_CODE, "javascript");
  $("#statTopics").textContent = LIBRARY.length;
  $("#statExercises").textContent = EXERCISES.length;
  $("#statLangs").textContent = LANGUAGES.length;
  $("#year").textContent = new Date().getFullYear();

  $("#featuresGrid").innerHTML = FEATURES.map((f, i) => `
    <button class="feature" type="button" data-feature="${i}">
      <span class="feature__ico">${icon(f.ico)}</span>
      <h3>${esc(f.title)}</h3>
      <p>${esc(f.desc)}</p>
    </button>`).join("");

  on($("#featuresGrid"), "click", "[data-feature]", (e, el) => {
    const f = FEATURES[Number(el.dataset.feature)];
    if (f.nav) navTo(f.nav);
    else prefillChat(f.prompt);
  });
}
