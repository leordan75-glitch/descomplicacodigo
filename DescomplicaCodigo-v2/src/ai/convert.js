/* =========================================================
   Conversão aproximada entre linguagens.
   Suporta JavaScript ↔ Python. Outros pares: IA real.
   ========================================================= */
import { detectLang } from "./detect.js";

function jsToPython(code) {
  return code
    .replace(/console\.log\s*\(/g, "print(")
    .replace(/\bfunction\s+(\w+)\s*\(([^)]*)\)\s*\{/g, "def $1($2):")
    .replace(/\b(?:const|let|var)\s+/g, "")
    .replace(/(^|[^:])\/\/(.*)$/gm, "$1#$2")
    .replace(/\btrue\b/g, "True").replace(/\bfalse\b/g, "False").replace(/\b(null|undefined)\b/g, "None")
    .replace(/\s*&&\s*/g, " and ").replace(/\s*\|\|\s*/g, " or ")
    .replace(/!==/g, "!=").replace(/===/g, "==")
    .replace(/(^|[\s(])!(?=[A-Za-z_(])/g, "$1not ")
    .replace(/\}\s*else\s+if\s*\((.*)\)\s*\{/g, "elif $1:")
    .replace(/\}\s*else\s*\{/g, "else:")
    .replace(/\b(if|while)\s*\((.*)\)\s*\{/g, "$1 $2:")
    .replace(/\bfor\s*\(\s*(\w+)\s+of\s+(.+?)\)\s*\{/g, "for $1 in $2:")
    .replace(/\bfor\s*\(\s*(\w+)\s*=\s*(\S+?)\s*;\s*\1\s*<\s*(.+?)\s*;\s*\1\+\+\s*\)\s*\{/g, "for $1 in range($2, $3):")
    .replace(/\bfor\s*\(\s*(\w+)\s*=\s*(\S+?)\s*;\s*\1\s*<=\s*(.+?)\s*;\s*\1\+\+\s*\)\s*\{/g, "for $1 in range($2, $3 + 1):")
    .replace(/(\w+)\+\+/g, "$1 += 1")
    .replace(/([\w.]+)\.length\b/g, "len($1)")
    .replace(/^\s*\}\s*;?\s*$/gm, "")
    .replace(/;\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function pythonToJs(code) {
  const lines = code.split("\n");
  const out = [];
  const stack = []; // indentações dos blocos abertos
  const declared = new Set();
  const indentOf = (l) => (/^\s*/.exec(l) || [""])[0].length;
  const closeTo = (level) => {
    while (stack.length && stack[stack.length - 1] >= level) out.push(" ".repeat(stack.pop()) + "}");
  };
  for (const raw of lines) {
    if (raw.trim() === "") { out.push(""); continue; }
    const ind = indentOf(raw);
    closeTo(ind);
    let l = raw.trim()
      .replace(/^#(.*)$/, "//$1")
      .replace(/\s+#(.*)$/, " //$1")
      .replace(/\bprint\s*\(/g, "console.log(")
      .replace(/\bTrue\b/g, "true").replace(/\bFalse\b/g, "false").replace(/\bNone\b/g, "null")
      .replace(/\band\b/g, "&&").replace(/\bor\b/g, "||").replace(/\bnot\s+/g, "!")
      .replace(/\blen\((\w+)\)/g, "$1.length");
    let opensBlock = false;
    if (/:\s*(\/\/.*)?$/.test(l)) {
      opensBlock = true;
      l = l.replace(/:\s*(\/\/.*)?$/, (_, com) => " {" + (com ? " " + com : ""));
      l = l
        .replace(/^def\s+(\w+)\s*\(([^)]*)\)\s*\{/, "function $1($2) {")
        .replace(/^elif\s+(.+)\s*\{/, "} else if ($1) {")
        .replace(/^else\s*\{/, "} else {")
        .replace(/^(if|while)\s+(.+?)\s*\{/, "$1 ($2) {")
        .replace(/^for\s+(\w+)\s+in\s+range\(\s*(\S+?)\s*,\s*(.+?)\s*\)\s*\{/, "for (let $1 = $2; $1 < $3; $1++) {")
        .replace(/^for\s+(\w+)\s+in\s+range\(\s*(.+?)\s*\)\s*\{/, "for (let $1 = 0; $1 < $2; $1++) {")
        .replace(/^for\s+(\w+)\s+in\s+(.+?)\s*\{/, "for (const $1 of $2) {");
      // "} else" fecha o bloco anterior: remove o "}" que closeTo acabou de colocar
      if (/^\} else/.test(l) && out.length && out[out.length - 1].trim() === "}") out.pop();
    } else if (/^[A-Za-z_]\w*\s*=[^=]/.test(l)) {
      const name = /^\w+/.exec(l)[0];
      l = (declared.has(name) ? "" : "let ") + l + ";";
      declared.add(name);
    } else if (!/^\/\//.test(l)) {
      l += ";";
    }
    out.push(" ".repeat(ind) + l);
    if (opensBlock) stack.push(ind);
  }
  closeTo(0);
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/**
 * @returns {{ from: string, out: string, note: "same" | "aprox" | "manual" }}
 */
export function convertCode(code, to, fromHint) {
  const from = fromHint && fromHint !== "auto" ? fromHint : detectLang(code);
  if (from === to) return { from, out: code, note: "same" };
  if (from === "javascript" && to === "python") return { from, out: jsToPython(code), note: "aprox" };
  if (from === "python" && to === "javascript") return { from, out: pythonToJs(code), note: "aprox" };
  if (from === "javascript" && to === "typescript") return { from, out: code, note: "aprox" };
  return { from, out: code, note: "manual" };
}
