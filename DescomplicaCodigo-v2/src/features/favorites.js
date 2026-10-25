/* =========================================================
   Favoritos (dados + tela)
   Cada favorito usa o MESMO id da mensagem do chat — assim o
   botão "Favoritar" sabe o estado certo ao reabrir conversas.
   ========================================================= */
import { $, on } from "../core/dom.js";
import { store } from "../core/storage.js";
import { timeAgo } from "../core/text.js";
import { emptyState, listItem } from "../ui/components.js";
import { openModal, toast } from "../ui/overlay.js";
import { onEnter } from "../app/router.js";

export const listFavorites = () => store.get("favorites", []);
const save = (favs) => store.set("favorites", favs);

export function isFavorite(id) {
  return listFavorites().some((f) => f.id === id);
}

/** Alterna o favorito de uma mensagem. Retorna true se ficou favoritada. */
export function toggleFavorite(msg) {
  const favs = listFavorites();
  const i = favs.findIndex((f) => f.id === msg.id);
  if (i >= 0) {
    favs.splice(i, 1);
    save(favs);
    return false;
  }
  favs.unshift({ id: msg.id, title: msg.title || "Explicação", plain: msg.plain || "", html: msg.html, ts: Date.now() });
  save(favs);
  return true;
}

function render() {
  const favs = listFavorites();
  const panel = $("#favList");
  if (!favs.length) {
    panel.innerHTML = emptyState({ ico: "star", title: "Nenhum favorito ainda", desc: "Salve explicações importantes clicando em “Favoritar” nas respostas.", button: "Ir para o chat", nav: "perguntar" });
    return;
  }
  panel.innerHTML = favs.map((f) => listItem({
    ico: "star", title: f.title, desc: `${timeAgo(f.ts)} • ${f.plain || "Explicação salva"}`,
    attrs: `data-open-fav="${f.id}"`, delAttrs: `data-del-fav="${f.id}"`, delLabel: "Remover dos favoritos",
  })).join("");
}

export function initFavorites() {
  onEnter("favoritos", render);
  const panel = $("#favList");
  on(panel, "click", "[data-open-fav]", (e, el) => {
    const f = listFavorites().find((x) => x.id === el.dataset.openFav);
    if (f) openModal(`<div class="rich">${f.html}</div>`);
  });
  on(panel, "click", "[data-del-fav]", (e, el) => {
    save(listFavorites().filter((f) => f.id !== el.dataset.delFav));
    render();
    toast("Favorito removido");
  });
}
