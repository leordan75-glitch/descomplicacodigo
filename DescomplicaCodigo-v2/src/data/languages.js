/* =========================================================
   Linguagens — fonte única de verdade.
   Usada pelo seletor do chat, rótulos dos blocos de código,
   estatísticas do dashboard e contagem da Home.
   ========================================================= */

/** Linguagens que o usuário pode escolher no chat. */
export const LANGUAGES = [
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "csharp", label: "C#" },
  { id: "cpp", label: "C++" },
  { id: "php", label: "PHP" },
  { id: "sql", label: "SQL" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
];

/** Outras que só aparecem em exemplos (não no seletor). */
const EXTRA_LABELS = { bash: "Bash" };

const LABELS = Object.fromEntries(LANGUAGES.map((l) => [l.id, l.label]));
Object.assign(LABELS, EXTRA_LABELS);

export function langLabel(id) {
  return LABELS[id] || id || "código";
}

export function isKnownLang(id) {
  return Boolean(id && LABELS[id]);
}
