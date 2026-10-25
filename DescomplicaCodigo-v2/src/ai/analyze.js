/* =========================================================
   Análise estática simples: encontra erros comuns de iniciante
   e gera uma versão corrigida.
   ========================================================= */

const KNOWN_GLOBALS = new Set([
  "console", "log", "Math", "document", "window", "JSON", "Object", "Array", "String", "Number", "Boolean",
  "print", "println", "len", "range", "input", "System", "out", "err", "parseInt", "parseFloat", "fetch",
  "alert", "prompt", "map", "filter", "reduce", "push", "forEach", "sum", "str", "int", "float", "list",
  "dict", "Date", "Promise", "require", "module", "process", "true", "false", "null", "undefined",
  "None", "True", "False", "this", "self", "NaN", "Infinity", "localStorage", "navigator", "Error",
]);

/** Remove strings e comentários (para não contar "(" dentro de textos). */
function stripNoise(code, lang) {
  let s = code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`/g, '""')
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
  if (lang === "python" || lang === "php") s = s.replace(/#[^\n]*/g, "");
  return s;
}

function collectDeclared(code) {
  const declared = new Set(KNOWN_GLOBALS);
  const add = (re, pick = (m) => [m[1]]) => {
    for (const m of code.matchAll(re)) pick(m).forEach((n) => n && declared.add(n.trim()));
  };
  add(/\b(?:const|let|var|function|def|class)\s+([A-Za-z_$]\w*)/g);
  add(/\b(?:int|long|float|double|char|boolean|bool|String|string|auto|var)\s+([A-Za-z_]\w*)/g);
  add(/(?:function\s*\w*|def\s+\w+)\s*\(([^)]*)\)/g, (m) => m[1].split(",").map((p) => p.trim().split(/[:=\s]/)[0]));
  add(/\(([^()]*)\)\s*=>/g, (m) => m[1].split(",").map((p) => p.trim().split(/[:=\s]/)[0]));
  add(/\b([A-Za-z_]\w*)\s*=>/g);
  add(/(?:^|\n|;)\s*([A-Za-z_]\w*)\s*=(?!=)/g);
  add(/\bfor\s*\(?\s*(?:const|let|var)?\s*([A-Za-z_]\w*)/g);
  add(/\bimport\s+([A-Za-z_]\w*)/g);
  add(/\bfrom\s+\S+\s+import\s+([\w, ]+)/g, (m) => m[1].split(","));
  add(/\bimport\s*\{([^}]*)\}/g, (m) => m[1].split(",").map((p) => p.trim().split(/\s+as\s+/).pop()));
  add(/\bcatch\s*\(\s*([A-Za-z_]\w*)/g);
  return declared;
}

const PRINT_CALL = /(?:console\.log|print|System\.out\.print(?:ln)?|echo|document\.write)\s*\(([^()]*)\)/g;

function declarationFor(name, lang, indent) {
  switch (lang) {
    case "python": return `${indent}${name} = "valor"  # TODO: defina o valor certo`;
    case "java": return `${indent}String ${name} = "valor"; // TODO: ajuste o tipo e o valor`;
    case "csharp": return `${indent}var ${name} = "valor"; // TODO: defina o valor certo`;
    case "cpp": return `${indent}std::string ${name} = "valor"; // TODO: ajuste o tipo e o valor`;
    default: return `${indent}const ${name} = "valor"; // TODO: defina o valor certo`;
  }
}

/**
 * @returns {{ problems: {line:number, name?:string, msg:string, why:string}[], fixed: string, hasFix: boolean }}
 * Os campos msg/why são HTML seguro (nomes são sempre identificadores \w).
 */
export function analyzeCode(code, lang) {
  const problems = [];
  const declared = collectDeclared(code);
  const lines = code.split("\n");
  const firstUse = new Map(); // nome → índice da linha

  lines.forEach((ln, i) => {
    for (const call of ln.matchAll(PRINT_CALL)) {
      call[1].split(",").forEach((arg) => {
        const name = arg.trim();
        if (/^[A-Za-z_]\w*$/.test(name) && !declared.has(name) && !firstUse.has(name)) {
          firstUse.set(name, i);
          problems.push({
            line: i + 1, name,
            msg: `A variável <b>${name}</b> não foi declarada.`,
            why: `Você usou <code>${name}</code>, mas ela nunca foi criada antes. O programa não sabe o que colocar no lugar de <code>${name}</code>.`,
          });
        }
      });
    }
  });

  // parênteses / chaves / colchetes desbalanceados (ignorando textos e comentários)
  const clean = stripNoise(code, lang);
  const count = (ch) => clean.split(ch).length - 1;
  const pairs = [["(", ")", "Parênteses"], ["{", "}", "Chaves"], ["[", "]", "Colchetes"]];
  pairs.forEach(([open, close, label]) => {
    const diff = count(open) - count(close);
    if (diff !== 0) {
      problems.push({
        line: 0,
        msg: `${label} desbalanceados: ${diff > 0 ? `falta${diff > 1 ? "m" : ""} ${diff} <code>${close}</code>` : `sobra${-diff > 1 ? "m" : ""} ${-diff} <code>${close}</code>`}.`,
        why: `Cada <code>${open}</code> aberto precisa de um <code>${close}</code> correspondente.`,
      });
    }
  });

  // versão corrigida: declara cada variável logo antes do primeiro uso
  let fixed = code;
  if (firstUse.size) {
    const out = [...lines];
    [...firstUse.entries()]
      .sort((a, b) => b[1] - a[1]) // de baixo para cima, para não bagunçar os índices
      .forEach(([name, idx]) => {
        const indent = (/^\s*/.exec(lines[idx]) || [""])[0];
        out.splice(idx, 0, declarationFor(name, lang, indent));
      });
    fixed = out.join("\n");
  }

  return { problems, fixed, hasFix: firstUse.size > 0 };
}
