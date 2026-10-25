/* =========================================================
   Ícones SVG inline (herdam a cor do texto via currentColor).
   No HTML: <span data-ico="home"></span>
   No JS:   icon("home")
   ========================================================= */
const S = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

const ICONS = {
  home: `<svg ${S}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/></svg>`,
  chat: `<svg ${S}><path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/></svg>`,
  book: `<svg ${S}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h13"/></svg>`,
  target: `<svg ${S}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`,
  chart: `<svg ${S}><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6" rx="1"/><rect x="12" y="7" width="3" height="10" rx="1"/><rect x="17" y="13" width="3" height="4" rx="1"/></svg>`,
  clock: `<svg ${S}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  star: `<svg ${S}><path d="m12 3 2.9 5.9 6.1.9-4.5 4.3 1 6.1-5.5-2.9L6.5 20l1-6.1L3 9.8l6.1-.9z"/></svg>`,
  search: `<svg ${S}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
  menu: `<svg ${S}><path d="M4 6h16M4 12h16M4 18h16"/></svg>`,
  panel: `<svg ${S}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>`,
  user: `<svg ${S}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>`,
  code: `<svg ${S}><path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/></svg>`,
  sparkles: `<svg ${S}><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m6 6 2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/><circle cx="12" cy="12" r="2.5"/></svg>`,
  send: `<svg ${S}><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg>`,
  plus: `<svg ${S}><path d="M12 5v14M5 12h14"/></svg>`,
  x: `<svg ${S}><path d="M18 6 6 18M6 6l12 12"/></svg>`,
  copy: `<svg ${S}><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>`,
  check: `<svg ${S.replace('stroke-width="2"', 'stroke-width="2.5"')}><path d="M20 6 9 17l-5-5"/></svg>`,
  list: `<svg ${S}><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>`,
  wrench: `<svg ${S}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 18v3h3l6.5-6.3a4 4 0 0 0 5.2-5.4l-2.7 2.7-2.3-.5-.5-2.3z"/></svg>`,
  swap: `<svg ${S}><path d="M7 4 3 8l4 4"/><path d="M3 8h14"/><path d="m17 20 4-4-4-4"/><path d="M21 16H7"/></svg>`,
  alert: `<svg ${S}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>`,
  trash: `<svg ${S}><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>`,
  flame: `<svg ${S}><path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-1.5.6-2.8 1.4-3.8C9 9.5 9 8 8.5 7c2 .5 3.5-1 3.5-4z"/></svg>`,
  layers: `<svg ${S}><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>`,
  sun: `<svg ${S}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 3.5 3.5M20.5 20.5 19 19M19 5l1.5-1.5M3.5 20.5 5 19"/></svg>`,
  moon: `<svg ${S}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
  google: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.5-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6z"/><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.4 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3C3.7 21.4 7.5 24 12 24z"/><path fill="#FBBC05" d="M5.6 14.7a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.5 0 3.7 2.6 1.8 6.4l3.8 3a7.1 7.1 0 0 1 6.4-4.6z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1a11 11 0 0 0-3.5 21.4c.6.1.8-.2.8-.5v-2c-3 .7-3.7-1.3-3.7-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7 0-.7 0-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.4-.3-5-1.2-5-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.4 10.4 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.2-2.6 5.1-5 5.4.4.3.8 1 .8 2.1v3.1c0 .3.2.6.8.5A11 11 0 0 0 12 1z"/></svg>',
};

export function icon(name) {
  return ICONS[name] || "";
}

/** Preenche todos os <span data-ico="nome"> dentro de `root`. */
export function renderIcons(root = document) {
  root.querySelectorAll("[data-ico]:empty").forEach((el) => {
    el.innerHTML = icon(el.dataset.ico);
  });
}
