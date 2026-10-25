/* =========================================================
   DescomplicaCódigo — ponto de entrada
   Liga os módulos na ordem certa. Cada tela vive em features/.
   ========================================================= */
import { $, on } from "./core/dom.js";
import { renderIcons } from "./ui/icons.js";
import { initModal, copyText } from "./ui/overlay.js";
import { initShell } from "./app/shell.js";
import { initRouter } from "./app/router.js";
import { initHome } from "./features/home.js";
import { initChat } from "./features/chat.js";
import { initLibrary } from "./features/library.js";
import { initExercises } from "./features/exercises.js";
import { initDashboard } from "./features/dashboard.js";
import { initFavorites } from "./features/favorites.js";
import { initSearch } from "./features/search.js";
import { initAuth } from "./features/auth.js";

function init() {
  renderIcons(document);
  initShell();
  initModal();

  // telas (registram seus "onEnter" antes do roteador iniciar)
  initHome();
  initChat();
  initLibrary();
  initExercises();
  initDashboard();
  initFavorites();
  initSearch();
  initAuth();

  // botão "Copiar" de qualquer bloco de código (chat, modal, exercícios)
  on(document, "click", "[data-action='copy-code']", (e, el) => {
    copyText(el.closest(".codeblock").querySelector("code").textContent);
  });

  // link "Pular para o conteúdo" sem mexer na rota
  on(document, "click", ".skip-link", (e) => { e.preventDefault(); $("#main").focus(); });

  initRouter();
}

init();
