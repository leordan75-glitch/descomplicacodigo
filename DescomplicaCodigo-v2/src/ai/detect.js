/* =========================================================
   Detecção: é código? qual linguagem? o que o usuário quer?
   ========================================================= */

/** Adivinha a linguagem de um trecho de código. */
export function detectLang(code) {
  const c = code || "";
  if (/^\s*</.test(c) && /<\/?[a-z]/i.test(c) && !/<\?php/.test(c)) return "html";
  if (/\b(SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+TABLE)\b/i.test(c) && !/[{}]/.test(c)) return "sql";
  if (/#include|std::|cout\s*<<|cin\s*>>/.test(c)) return "cpp";
  if (/<\?php|\$[A-Za-z_]\w*\s*=/.test(c)) return "php";
  if (/using\s+System|Console\.Write|namespace\s+\w|static\s+void\s+Main/.test(c)) return "csharp";
  if (/System\.out\.print|public\s+(class|static)|void\s+main\s*\(/.test(c)) return "java";
  if (/\bdef\s+\w+\s*\(|\belif\b|^\s*import\s+\w+\s*$|:\s*$/m.test(c) && !/[;{}]\s*$/m.test(c)) return "python";
  if (/^\s*print\s*\(/m.test(c) && !/[;{}]\s*$/m.test(c)) return "python";
  if (/:\s*(string|number|boolean|any|void)\b|\binterface\s+\w+\s*\{|\btype\s+\w+\s*=/.test(c)) return "typescript";
  if (/^[\s.#\w-]+\{[^}]*:[^;]+;/m.test(c) && !/\b(function|const|let|var|return)\b|=>/.test(c)) return "css";
  return "javascript";
}

const CODE_HINT = /console\.|System\.out|print\s*\(|\bdef\s|\bfunction\s|=>|\{[\s\S]*\}|SELECT\s.+FROM|<\/?[a-z][\w-]*[\s>]|;\s*$/im;

/** O texto contém código? */
export function looksLikeCode(text) {
  if (/\n/.test(text) && /[;{}=()]|\bdef\s|\bclass\s|print\(|console\.|=>|<[a-z]/i.test(text)) return true;
  return CODE_HINT.test(text);
}

const CODEISH = /[;{}()=[\]]|=>|<[a-z/]|console|print|\bdef\s|\bfunction\s|\breturn\b|\bimport\s|\bclass\s|SELECT|\bfor\s|\bwhile\s|\bif\s|\becho\b|System\./i;
const INSTRUCTION = /\b(explique|explica|corrig|otimiz|convert|transform|melhor|deixe|crie|gere|criar|gerar|por que|porque|o que|como|traduz|linha por linha|analis|revis|ajud|pode|reescrev)/i;

/** Frase comum em português (3+ palavras, sem símbolos de código). */
const isProse = (l) => /^[\p{L}\s,.!?'"…-]+$/u.test(l) && l.split(/\s+/).length >= 3;
const isRequest = (l) => !CODEISH.test(l) && (/[:?]\s*$/.test(l) || INSTRUCTION.test(l) || isProse(l));

/** Separa o código das frases de pedido ("Explique esse código:"). */
export function extractCode(text) {
  const lines = text.split("\n");
  while (lines.length) {
    const l = lines[0].trim();
    if (l === "") { lines.shift(); continue; }
    if (isRequest(l)) { lines.shift(); continue; }
    // "Explique esse código: const x = 1" → mantém só o que vem depois dos dois-pontos
    const inline = /^([^:]*?\b(?:explique|explica|corrija|converta|melhore|analise|otimize|transforme)[^:]*):\s*(.+)$/i.exec(l);
    if (inline) { lines[0] = inline[2]; }
    break;
  }
  while (lines.length) {
    const l = lines[lines.length - 1].trim();
    if (l === "") { lines.pop(); continue; }
    if (!CODEISH.test(l) && (INSTRUCTION.test(l) || isProse(l))) { lines.pop(); continue; }
    break;
  }
  return lines.join("\n").trim() || text.trim();
}

/* ---------- Linguagem de destino (conversão) ---------- */
const TARGET_MAP = {
  java: "java", python: "python", py: "python", javascript: "javascript", js: "javascript",
  "c#": "csharp", csharp: "csharp", "c++": "cpp", cpp: "cpp", php: "php",
  typescript: "typescript", ts: "typescript", sql: "sql",
};
// (?=…) no fim em vez de \b: "c++" e "c#" terminam com símbolo
const LANG_ALT = "java(?!script)|javascript|js|python|py|c#|csharp|c\\+\\+|cpp|php|typescript|ts|sql";
const END = "(?=[\\s.,!?:;)]|$)";
const TARGET_RE = new RegExp(`\\b(?:para|pra|em|to|into)\\s+(?:o\\s+|a\\s+)?(${LANG_ALT})${END}`, "i");

export function detectTargetLang(text) {
  const m = TARGET_RE.exec(text.toLowerCase());
  return m ? TARGET_MAP[m[1]] : null;
}

/* ---------- Intenção ---------- */
export function detectIntent(text) {
  const low = text.toLowerCase();
  const target = detectTargetLang(low);
  const convertVerb = /\b(convert|transform|traduz|reescrev|passa(r)?\s+(isso\s+|esse\s+código\s+)?(para|pra))/.test(low);
  const hasMoneyValue = /\b\d+(?:[.,]\d+)?\s*(?:dólar(?:es)?|dolar(?:es)?|real(?:es)?|euro(?:s)?|libra(?:s)?|yuan|iene|won)/.test(low);
  const hasMoneyTarget = /\b(?:para|pra)\s+(?:o\s+|a\s+)?(?:real(?:es)?|dólar(?:es)?|dolar(?:es)?|euro(?:s)?|libra(?:s)?|yuan|iene|won)/.test(low);
  const isMoneyConversion = /\b(?:converta|converter|transforme)\b/.test(low) && hasMoneyValue && hasMoneyTarget;
  const fix = /\berr(o|os|or)\b|\bcorrig|\bbug|não funciona|nao funciona|dando erro|\bfalh|\bquebr|não roda|nao roda|exception|traceback/.test(low);
  const improve = /otimiz|melhor(ar|e|ia)|mais limpo|legív|legiv|desempenho|refator|boas? prátic|boas? pratic|organiz|mais rápid|mais rapid/.test(low);
  const generate = (/\b(crie|gere|criar|gerar|construa|construi|faça|fazer)\b/.test(low) || isMoneyConversion) && !/\b(corrig|explique|explica|melhor)\b/.test(low);
  const toLang = new RegExp(`\b(para|pra)\s+(o\s+)?(${LANG_ALT})${END}`).test(low);
  return {
    target,
    convert: convertVerb || (toLang && !fix && !improve),
    fix,
    improve,
    generate,
  };
}
