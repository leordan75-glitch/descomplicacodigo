/* =========================================================
   Realce de sintaxe (próprio, offline, sem dependências).
   Tokeniza o código ORIGINAL e escapa cada pedaço — assim o
   HTML gerado é sempre seguro e as regras não "enxergam" &lt;.
   ========================================================= */
import { esc } from "../core/dom.js";

const KEYWORDS = [
  "const", "let", "var", "function", "def", "class", "if", "else", "elif", "for", "while", "return",
  "import", "from", "export", "default", "new", "public", "private", "protected", "static", "final",
  "void", "int", "float", "double", "char", "boolean", "bool", "string", "String", "true", "false",
  "True", "False", "null", "None", "nil", "undefined", "in", "of", "and", "or", "not", "is", "try", "except",
  "catch", "finally", "throw", "throws", "this", "self", "async", "await", "switch", "case", "break",
  "continue", "do", "struct", "enum", "interface", "type", "extends", "implements", "super", "lambda",
  "yield", "with", "as", "foreach", "fun", "val", "package", "using", "namespace", "echo",
].join("|");

const SQL_KEYWORDS = [
  "select", "from", "where", "insert", "into", "values", "update", "set", "delete", "create", "table",
  "order", "by", "group", "join", "left", "right", "inner", "on", "limit", "and", "or", "not", "null",
  "as", "distinct", "count", "having", "primary", "key",
].join("|");

// Comentários por linguagem (o "#" só vale onde é comentário de verdade)
const COMMENT_C = /\/\/[^\n]*|\/\*[\s\S]*?\*\//.source;
const COMMENTS = {
  python: /#[^\n]*/.source,
  bash: /#[^\n]*/.source,
  php: /\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\//.source,
  sql: /--[^\n]*|\/\*[\s\S]*?\*\//.source,
  html: /<!--[\s\S]*?-->/.source,
  css: /\/\*[\s\S]*?\*\//.source,
};

const STRING = /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`/.source;
const NUMBER = /\b\d+(?:\.\d+)?\b/.source;
const FUNC = /[A-Za-z_]\w*(?=\s*\()/.source;

const cache = new Map();

function tokenRegex(lang) {
  if (cache.has(lang)) return cache.get(lang);
  const comment = COMMENTS[lang] || COMMENT_C;
  let keywords = KEYWORDS;
  let flags = "g";
  if (lang === "sql") { keywords = SQL_KEYWORDS; flags = "gi"; }
  const noKeywords = lang === "html" || lang === "css";
  const parts = [
    `(${comment})`,
    `(${STRING})`,
    `(${NUMBER})`,
    noKeywords ? "(?!)" : `(\\b(?:${keywords})\\b)`,
    noKeywords ? "(?!)" : `(${FUNC})`,
  ];
  const re = new RegExp(parts.join("|"), flags);
  cache.set(lang, re);
  return re;
}

const CLASS_BY_GROUP = [null, "com", "str", "num", "key", "fn"];

export function highlight(code, lang = "javascript") {
  const src = String(code ?? "");
  let out = "";
  let last = 0;
  for (const m of src.matchAll(tokenRegex(lang))) {
    const group = m.findIndex((g, i) => i > 0 && g !== undefined);
    out += esc(src.slice(last, m.index));
    out += `<span class="tok-${CLASS_BY_GROUP[group]}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(src.slice(last));
}
