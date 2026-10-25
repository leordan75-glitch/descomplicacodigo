/* =========================================================
   Montagem das respostas. Cada função devolve:
     { html, plain, lang }
   html  → conteúdo rico (seguro) exibido no chat
   plain → resumo em texto (copiar / lista de favoritos)
   lang  → linguagem para as estatísticas
   ========================================================= */
import { esc } from "../core/dom.js";
import { shorten } from "../core/text.js";
import { langLabel } from "../data/languages.js";
import { codeBlock, callout } from "../ui/components.js";
import { icon } from "../ui/icons.js";
import { highlight } from "../ui/highlight.js";
import { analyzeCode } from "./analyze.js";
import { analyzeExplanation } from "./explain.js";
import { convertCode } from "./convert.js";

const h3 = (ico, text) => `<h3>${icon(ico)} ${text}</h3>`;
const h4 = (ico, text) => `<h4>${icon(ico)} ${text}</h4>`;
const L = (id) => esc(langLabel(id));

function generatedCodeFromPrompt(prompt, lang) {
  const normalized = prompt.trim();
  const inJavaScript = lang === "javascript" || lang === "typescript";

  if (/soma|somar|adição|adicao|total/i.test(normalized)) {
    return inJavaScript
      ? `function somar(a, b) {
  return a + b;
}

const resultado = somar(4, 5);
console.log(resultado);`
      : `def somar(a, b):
    return a + b

resultado = somar(4, 5)
print(resultado)`;
  }

  if (/lista|array|vetor|coleção|colet/i.test(normalized)) {
    return inJavaScript
      ? `const numeros = [3, 8, 1, 6];
const maioresQueCinco = numeros.filter((numero) => numero > 5);
console.log(maioresQueCinco);`
      : `numeros = [3, 8, 1, 6]
maiores_que_cinco = [numero for numero in numeros if numero > 5]
print(maiores_que_cinco)`;
  }

  if (/função|funcao|function/i.test(normalized)) {
    return inJavaScript
      ? `function saudacao(nome) {
  return \`Olá, \${nome}!\`;
}

console.log(saudacao("Estudante"));`
      : `def saudacao(nome):
    return f"Olá, {nome}!"

print(saudacao("Estudante"))`;
  }

  if (/moeda|dólar|dolar|real|eur|libra|taxa/i.test(normalized)) {
    return inJavaScript
      ? `function converterMoeda(valor, taxa, moedaOrigem = "USD", moedaDestino = "BRL") {
  const convertido = valor * taxa;
  return {
    valor: Number(convertido.toFixed(2)),
    moedaOrigem,
    moedaDestino,
  };
}

const valorEmDolares = 100;
const taxaDeCambio = 5.2;
const resultado = converterMoeda(valorEmDolares, taxaDeCambio, "USD", "BRL");

console.log(\`\${resultado.valor} \${resultado.moedaDestino}\`);`
      : `def converter_moeda(valor, taxa, moeda_origem="USD", moeda_destino="BRL"):
    convertido = valor * taxa
    return {
        "valor": round(convertido, 2),
        "moeda_origem": moeda_origem,
        "moeda_destino": moeda_destino,
    }

valor_em_dolares = 100
taxa_de_cambio = 5.2
resultado = converter_moeda(valor_em_dolares, taxa_de_cambio, "USD", "BRL")
print(f"{resultado['valor']} {resultado['moeda_destino']}")`;
  }

  return inJavaScript
    ? `function executarTarefa() {
  console.log("Tarefa executada.");
}

executarTarefa();`
    : `def executar_tarefa():
    print("Tarefa executada.")

executar_tarefa()`;
}

export function generateResponse(prompt, lang, originalText) {
  const code = generatedCodeFromPrompt(originalText || prompt, lang);
  const html =
    h3("sparkles", "Código gerado") +
    `<p>Criei uma primeira versão baseada no pedido: <b>${esc(shorten(prompt, 120))}</b>.</p>` +
    `<h4>Resultado</h4>` + codeBlock(lang, code) +
    `<p>Você pode alterar os valores, nomes e regras conforme a necessidade. O exemplo acima está pronto para copiar e testar.</p>` +
    callout("tip", "Use o botão “Copiar” para salvar o código, ou peça uma nova versão mais simples, segura ou com outra linguagem.");
  return { html, plain: `Código gerado em ${langLabel(lang)}.`, lang };
}

export function explainResponse(code, lang) {
  const analysis = analyzeExplanation(code);
  const rows = analysis.lines
    .map((l) => `<div class="lbl__row"><div class="lbl__num">${l.line}</div><div class="lbl__cell"><div class="lbl__code">${highlight(l.code, lang)}</div><div class="lbl__exp">${l.exp}</div></div></div>`)
    .join("");
  const html =
    h3("list", "Explicação linha por linha") +
    `<p>Seu código em <b>${L(lang)}</b>, com cada linha explicada e relacionada ao seu contexto:</p>` +
    `<div class="lbl">${rows}</div>` +
    `<h4>Resumo do funcionamento</h4><p>${esc(analysis.summary)}</p>` +
    `<h4>Conceitos utilizados</h4><ul>${analysis.concepts.map((concept) => `<li>${esc(concept)}</li>`).join("")}</ul>` +
    (analysis.problems.length ? `<h4>Possíveis problemas</h4><ul>${analysis.problems.map((problem) => `<li>${esc(problem)}</li>`).join("")}</ul>` : "") +
    callout("tip", "<b>Dica:</b> leia cada bloco do começo para o fim e depois volte para a linha que chamou essa ação.");
  return { html, plain: `Explicação linha por linha (${langLabel(lang)}).`, lang };
}

export function fixResponse(code, lang) {
  const res = analyzeCode(code, lang);
  if (res.problems.length === 0) {
    const html =
      h3("check", "Análise do código") +
      callout("ok", "<b>Boa notícia!</b> Não encontrei variáveis não declaradas nem parênteses/chaves desbalanceados.") +
      codeBlock(lang, code) +
      "<p>Se ainda assim ele não funciona, me diga <b>qual mensagem de erro</b> aparece ou <b>o que era esperado</b> que acontecesse.</p>";
    return { html, plain: "Nenhum erro óbvio encontrado.", lang };
  }
  const n = res.problems.length;
  const items = res.problems
    .map((p) => `<li>${p.line ? `<b>Linha ${p.line}:</b> ` : ""}${p.msg}<br><span class="muted">Por quê? ${p.why}</span></li>`)
    .join("");
  let html =
    h3("wrench", "Correção automática") +
    callout("err", `<b>Encontrei ${n} ${n > 1 ? "problemas" : "problema"}:</b>`) +
    `<ul>${items}</ul>`;
  if (res.hasFix) {
    html +=
      h4("check", "Código corrigido") +
      "<p>Declarei a(s) variável(is) antes do uso. Troque <code>\"valor\"</code> pelo valor certo:</p>" +
      codeBlock(lang, res.fixed) +
      callout("tip", "<b>Dica:</b> sempre crie suas variáveis antes de usá-las — e confira se o nome está escrito igualzinho.");
  } else {
    html += h4("check", "Como corrigir") + "<p>Confira cada abertura de parêntese/chave/colchete e garanta que exista o fechamento correspondente.</p>";
  }
  return { html, plain: `${n} problema(s) encontrado(s) no código.`, lang };
}

export function improveResponse(code, lang) {
  const tips = [];
  const isJs = lang === "javascript" || lang === "typescript";
  if (isJs && /\bvar\b/.test(code)) tips.push("Troque <code>var</code> por <code>const</code> (ou <code>let</code>, se o valor mudar): é mais seguro e moderno.");
  if (isJs && /[^=!<>]==[^=]/.test(code)) tips.push("Use <code>===</code> em vez de <code>==</code> para comparar sem surpresas de tipo.");
  if (!/\/\/|#|\/\*|--/.test(code)) tips.push("Adicione <b>comentários</b> curtos explicando as partes principais.");
  if (/\b[a-z]\b\s*=/.test(code)) tips.push("Dê <b>nomes descritivos</b> às variáveis (ex.: <code>idade</code> em vez de <code>x</code>).");
  if (code.split("\n").some((l) => l.length > 80)) tips.push("Quebre linhas muito longas para melhorar a legibilidade.");
  if (tips.length < 3) tips.push("Separe o código em <b>funções pequenas</b>, cada uma com uma responsabilidade.");
  if (tips.length < 4) tips.push("Evite repetir código: se algo aparece 2+ vezes, transforme em função.");

  let improved = code;
  if (isJs) {
    improved = improved.replace(/\bvar\b/g, "let").replace(/([^=!<>])==([^=])/g, "$1===$2");
  }
  let html =
    h3("sparkles", "Melhorias sugeridas") +
    "<p>Ideias para deixar seu código mais limpo, legível e dentro das boas práticas:</p>" +
    `<ul>${tips.map((t) => `<li>${t}</li>`).join("")}</ul>`;
  html += improved !== code
    ? h4("sparkles", "Versão sugerida") + codeBlock(lang, improved) +
      callout("tip", "Estas são melhorias automáticas simples. Código bom nasce de praticar e revisar bastante. 💪")
    : callout("tip", "As melhorias acima são de estilo e organização. Continue praticando!");
  return { html, plain: "Sugestões de melhoria para o código.", lang };
}

export function convertResponse(code, target, fromLang) {
  const r = convertCode(code, target, fromLang);
  let html =
    h3("swap", "Conversão de código") +
    `<p>De <b>${L(r.from)}</b> para <b>${L(target)}</b>:</p>` +
    "<h4>Original</h4>" + codeBlock(r.from, code);
  if (r.note === "same") {
    html += callout("tip", `O código já parece estar em ${L(target)}. 😉`);
  } else if (r.note === "aprox") {
    html += `<h4>Em ${L(target)}</h4>` + codeBlock(target, r.out) +
      callout("tip", "<b>Conversão aproximada:</b> a lógica foi adaptada, mas revise a sintaxe e o resultado final.");
  } else {
    html += callout("tip", `<b>Conversão disponível:</b> atualmente o suporte inclui <b>JavaScript</b> e <b>Python</b>. Para outras linguagens, peça à IA para adaptar o código e revise o resultado final.`);
  }
  return { html, plain: `Conversão de código para ${langLabel(target)}.`, lang: target };
}

/** Corpo da explicação de um erro conhecido (reaproveitado pela busca). */
export function errorBody(err) {
  return callout("err", err.simple) +
    `<h4>O que está acontecendo</h4><p>${err.detail}</p>` +
    `<h4>Como resolver</h4><p>${err.fix}</p>`;
}

export function errorResponse(err) {
  const html = h3("alert", "Explicação do erro") +
    `<p><b>${esc(err.name)}</b> <span class="muted">(${esc(err.lang)})</span></p>` +
    errorBody(err);
  return { html, plain: `${err.name}: ${err.simple}`, lang: null };
}

export function askForCode(kind, target) {
  if (kind === "fix") {
    return {
      html: h3("wrench", "Correção automática") +
        "<p>Claro! Para eu encontrar o erro, <b>cole o código</b> aqui (e, se tiver, a mensagem de erro que apareceu).</p>" +
        callout("tip", "Você pode escolher a linguagem no seletor abaixo do campo, ou deixar em “Detectar linguagem”."),
      plain: "Pedido para colar o código.", lang: null,
    };
  }
  return {
    html: h3("swap", "Conversão de código") +
      `<p>Perfeito! Cole o código que você quer converter${target ? ` para <b>${L(target)}</b>` : ""} e eu adapto a lógica para você.</p>`,
    plain: "Pedido para colar o código a converter.", lang: null,
  };
}

export function genericResponse(text) {
  const html =
    h3("sparkles", "Vamos lá!") +
    `<p>Entendi sua pergunta: <i>“${esc(shorten(text, 80))}”</i>.</p>` +
    "<p>Para eu te ajudar da melhor forma, você pode:</p>" +
    "<ul><li>Colar um trecho de código e pedir <b>“explique linha por linha”</b>.</li>" +
    "<li>Descrever um erro que apareceu — eu explico em português simples.</li>" +
    "<li>Pedir para <b>gerar</b>, <b>corrigir</b> ou <b>melhorar</b> um código.</li></ul>" +
    callout("tip", "Você também pode explorar a <b>Biblioteca</b> e os <b>Exercícios</b> para continuar aprendendo.");
  return { html, plain: "Posso ajudar com explicações, código, erros e melhorias.", lang: null };
}
