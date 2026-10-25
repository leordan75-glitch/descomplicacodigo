/* =========================================================
   Explicação linha por linha com contexto do programa.
   Tudo que vem do usuário passa por esc() — o HTML é seguro.
   ========================================================= */
import { esc } from "../core/dom.js";
import { shorten } from "../core/text.js";

const b = (s) => `<b>${esc(s)}</b>`;
const c = (s) => `<code>${esc(shorten(s))}</code>`;

function createEmptyContext() {
  return {
    className: null,
    functionName: null,
    functionParams: [],
    attributes: new Map(),
    variables: new Map(),
    blockDepth: 0,
  };
}

function analyzeProgram(code) {
  const lines = code.split("\n");
  const context = createEmptyContext();
  const analyzed = [];

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index];
    const line = raw.replace(/\s+$/, "");
    const trimmed = line.trim();
    const item = { index, code: line, trimmed, context: { ...context, attributes: new Map(context.attributes), variables: new Map(context.variables) } };

    const classMatch = /^(?:export\s+)?class\s+([A-Za-z_]\w*)/.exec(trimmed);
    if (classMatch) {
      context.className = classMatch[1];
      item.context.className = context.className;
    }

    const functionMatch = /^(?:async\s+)?(?:def|function|fun)\s+([A-Za-z_]\w*)\s*\(([^)]*)\)/.exec(trimmed);
    if (functionMatch) {
      context.functionName = functionMatch[1];
      context.functionParams = splitParameters(functionMatch[2]);
      context.blockDepth = Math.max(context.blockDepth, 1);
      item.context.functionName = context.functionName;
      item.context.functionParams = [...context.functionParams];
    }

    const assignmentMatch = /^(?:self\.)?([A-Za-z_$][\w$]*)\s*(?::\s*[^=]+)?=\s*(.+)$/.exec(trimmed);
    if (assignmentMatch && !/^(?:if|elif|for|while|return|try|except|with|class|def|function|fun|import|from)\b/.test(trimmed)) {
      context.variables.set(assignmentMatch[1], assignmentMatch[2]);
      item.context.variables = new Map(context.variables);
    }

    const attributeMatch = /^self\.([A-Za-z_$][\w$]*)\s*(?::\s*[^=]+)?=\s*(.+)$/.exec(trimmed);
    if (attributeMatch) {
      context.attributes.set(`self.${attributeMatch[1]}`, attributeMatch[2]);
      item.context.attributes = new Map(context.attributes);
    }

    const parameterMatch = /^(?:self\s*,\s*)?([^\s)]+)\s*(?:=\s*(.+))?$/.exec(functionMatch?.[2] || "");
    if (parameterMatch && context.functionName) {
      item.context.functionParams = [...context.functionParams];
    }

    if (/^\s*$/.test(trimmed)) {
      item.context.description = "linha vazia";
    }

    analyzed.push(item);

    if (/^\s*(?:return|elif|else|except|finally|try|with|for|while|if)\b/.test(trimmed)) {
      continue;
    }
    if (/^\s*\}/.test(trimmed) || /^\s*\]\s*$/.test(trimmed) || /^\s*\)\s*$/.test(trimmed)) {
      context.blockDepth = Math.max(0, context.blockDepth - 1);
    }

    if (/^\s*(?:return|elif|else|except|finally|try|with|for|while|if)\b/.test(trimmed)) {
      context.blockDepth = Math.max(context.blockDepth, 1);
    }
  }

  return analyzed;
}

function splitParameters(params) {
  return params
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/\s*=.*$/, ""));
}

function explainContext(line, context) {
  const { className, functionName, functionParams, attributes, variables } = context;
  const currentFunction = functionName ? ` da função ${b(functionName)}` : "";
  const value = line.trim();

  if (!value) return "Linha vazia: organiza visualmente o código e separa blocos, sem executar nenhuma instrução.";
  if (functionName && /^(?:def|function|fun)\b/.test(value)) {
    const params = context.functionParams.length ? ` Recebe ${context.functionParams.map((param) => b(param)).join(", ")}.` : " Não recebe parâmetros.";
    return `Define a função ${b(functionName)}${params} Ela reúne instruções que podem ser executadas quando a função for chamada.`;
  }
  if (/^\s*(?:def|function|fun)\b/.test(value)) {
    return `Define a função ${b(value.match(/(?:def|function|fun)\s+([A-Za-z_]\w*)/)[1])}.`;
  }
  if (/^@dataclass\b/.test(value)) {
    return `O decorador ${b("@dataclass")} cria uma classe de dados com métodos úteis, como comparação e representação. Neste programa, ele transforma ${b(className || "a classe")} em um molde simples para guardar informações relacionadas.`;
  }
  if (/^(import|from|#include|require|using|package)\b/.test(value)) {
    return explainImport(value);
  }
  if (/^(?:public|private|protected|static)\b/.test(value)) {
    return `Define a visibilidade ou o comportamento do membro da classe. Neste contexto, ${b(value)} controla se ele pode ser usado fora da classe.`;
  }
  if (/^class\b/.test(value)) {
    return `Define a classe ${b(className || value.split(/\s+/)[1])}. Ela é o molde para criar objetos que agrupam dados e ações relacionados.`;
  }
  if (value.startsWith("self.")) {
    return explainSelfAccess(value, attributes, variables, className, functionName);
  }
  if (/^lambda\b/.test(value)) {
    return `É uma função anônima: recebe o valor indicado e retorna ${c(value.slice(value.indexOf(":") + 1).trim())}. Ela pode ser usada em uma operação curta, como calcular ou selecionar um valor.`;
  }
  if (/^\*\*\w+\b/.test(value)) {
    return `Recebe o conjunto de argumentos nomeados ainda não associados a parâmetros específicos. O valor pode ser usado para passar várias opções para a função chamada.`;
  }
  if (/^\s*(?:if|elif|else|for|while|try|except|with)\b/.test(value)) {
    return explainControlStructure(value, context);
  }
  if (/^return\b/.test(value)) {
    const match = /^return\s+(.+)$/.exec(value);
    return match ? `Encerra a função ${b(functionName || "atual")} e devolve ${describeValue(match[1])}. Esse valor será usado por quem chamou a função.` : `Encerra a função ${b(functionName || "atual")} e devolve o controle para quem a chamou.`;
  }
  if (/^(?:[A-Za-z_$][\w$]*\s*:\s*[^=]+(?:\s*=\s*.*)?|(?:const|let|var|int|float|str|bool|list|dict)\s+\w+\s*=)/.test(value)) {
    return explainVariableOrAnnotation(value, className, functionName);
  }
  if (/^(?:[A-Za-z_$][\w$.]*)\s*\([^)]*\)\s*;?$/.test(value) || /\.\w+\s*\([^)]*\)\s*;?$/.test(value)) {
    return explainCall(value, context);
  }
  if (/^\s*\}?\s*$/.test(value) || /^\s*\]\s*$/.test(value) || /^\s*\)\s*$/.test(value)) {
    return "Fecha o bloco ou a estrutura aberta anteriormente. Assim, o programa termina aquela parte e passa para o próximo trecho.";
  }
  if (/^\s*(?:\}|\])/.test(value)) {
    return "Fecha uma estrutura ou coleção que foi aberta antes; o código seguinte continuará fora desse bloco.";
  }
  if (/^\s*(?:\+\+|--)/.test(value)) {
    const target = value.replace(/\+\+|--/, "").trim();
    return `${target === "" ? "Incrementa" : `Incrementa ${b(target)}`} em 1. Neste programa, essa operação altera o valor da variável ou atributo.`;
  }
  if (/^[A-Za-z_$][\w$]*\s*=[^=]/.test(value)) {
    const match = /^([A-Za-z_$][\w$\.]*)\s*=\s*(.+)$/.exec(value);
    return `Atribui ${describeValue(match[2])} a ${b(match[1])}. O novo valor passa a ser usado por essa variável ou atributo a partir desta linha.`;
  }
  if (/^(?:\s*)(?:console\.log|print|println|System\.out\.print(?:ln)?|echo)\b/.test(value)) {
    const match = /(?:console\.log|print|println|System\.out\.print(?:ln)?|echo)\s*\(?\s*(.*?)\s*\)?\s*;?$/.exec(value);
    return `Mostra ${describeValue(match?.[1] || "o resultado")} no terminal. Essa mensagem ajuda a acompanhar o estado do programa durante a execução.`;
  }
  return `Essa linha executa ${c(value)}. No contexto do programa, ela ${explainPurpose(value, className, functionName, currentFunction)}.`;
}

function explainImport(line) {
  if (/^import\s+json\b/.test(line)) return "Importa o módulo json, usado para transformar dados em texto JSON e ler ou salvar esse formato.";
  if (/^import\s+os\b/.test(line)) return "Importa o módulo os, usado para acessar recursos do sistema operacional, como caminhos e comandos.";
  if (/^from\s+\w+\s+import\s+/.test(line)) return "Importa somente os recursos indicados do módulo. O programa poderá usar esses elementos sem precisar acessar todo o módulo.";
  return "Importa um módulo externo que fornece recursos usados nesta parte do programa.";
}

function explainVariableOrAnnotation(value, className, functionName) {
  const typeMatch = /^([A-Za-z_$][\w$]*)\s*:\s*([^=]+?)(?:\s*=\s*(.+))?\s*$/.exec(value);
  if (typeMatch) {
    const [, name, type, assigned] = typeMatch;
    const detail = assigned ? ` e recebe ${describeValue(assigned)}` : "";
    return `Declara ${b(name)} como ${b(type)}${detail}. Esse tipo indica quais valores são esperados nessa variável ou atributo.`;
  }

  const assignmentMatch = /^(?:[A-Za-z_$][\w$]*|\w+)\s+([A-Za-z_$][\w$]*)\s*=\s*(.+)$/.exec(value);
  if (assignmentMatch) {
    return `Cria a variável ${b(assignmentMatch[1])} e guarda ${describeValue(assignmentMatch[2])}. Ela será usada pelo código que aparecer depois desta linha.`;
  }

  return `Declara uma variável no escopo da ${className ? `classe ${b(className)}` : `função ${b(functionName || "atual")}`}. O nome e o valor informado mostram para que essa variável será usada.`;
}

function explainSelfAccess(value, attributes, variables, className, functionName) {
  const access = /^self\.([A-Za-z_$][\w$]*)/.exec(value);
  if (!access) return `O ${b("self")} representa o objeto atual.`;
  const name = access[1];
  const attr = attributes.get(`self.${name}`);
  const variable = variables.get(name);
  if (value.includes(".append(")) return `Chama o método ${b("append")}. O objeto ${b("self." + name)} recebe o novo valor informado como argumento, adicionando-o à lista pertencente ao objeto atual.`;
  if (value.includes(".lower(")) return `Converte para letras minúsculas o valor armazenado em ${b("self." + name)}. Isso deixa a comparação entre textos mais uniforme.`;
  if (value.includes(".save") || value.includes(".salvar")) return `Chama o método ${b(name)} do objeto atual. Esse método salva o conteúdo atual da classe, usando o atributo ${b("self." + name)} como parte desse processo.`;
  if (value.includes(".carregar")) return `Chama o método ${b(name)} do objeto atual. Esse método carrega dados e os prepara para uso dentro do objeto.`;
  if (value.includes("=")) return `Atribui ${describeValue(value.slice(value.indexOf("=") + 1).replace(/;$/, ""))} ao atributo ${b(name)} do objeto atual. Assim, o objeto passa a guardar esse novo valor.`;
  if (attr) return `Acessa ${b("self." + name)}, cujo valor atual é ${describeValue(attr)}. Ele informa o estado desse objeto nesse ponto do programa.`;
  if (variable) return `Usa a variável ${b(name)} que pertence ao objeto atual. O valor dela é ${describeValue(variable)}.`;
  return `Acessa o atributo ${b(name)} do objeto atual. Essa expressão permite usar o estado armazenado naquele objeto em ${b(functionName || "esta função")}.`;
}

function explainControlStructure(value, context) {
  const { functionName, attributes } = context;
  const normalized = value.trim();

  if (/^if\s+not\s+self\.[A-Za-z_$][\w$]*\s*:/.test(normalized)) {
    const target = normalized.match(/if\s+not\s+(self\.[A-Za-z_$][\w$]*)/)[1];
    return `Verifica se ${b(target)} está vazia. Quando não houver nenhum item nela, o programa executa o bloco dentro do if.`;
  }
  if (/^if\s+self\.[A-Za-z_$][\w$]*\s*:/.test(normalized)) {
    const target = normalized.match(/^if\s+(self\.[A-Za-z_$][\w$]*)\s*:/)[1];
    return `Verifica se ${b(target)} contém um valor verdadeiro. Se esse valor for verdadeiro, o programa executa o bloco dentro do if.`;
  }
  if (/^if\s+/.test(normalized)) {
    const condition = normalized.slice(2, -1).trim();
    return `Verifica a condição ${c(condition)}. Quando ela for verdadeira, o programa executa o bloco abaixo.`;
  }
  if (/^elif\s+/.test(normalized)) {
    const condition = normalized.slice(5, -1).trim();
    return `Verifica a condição ${c(condition)} somente se a condição anterior do if não foi atendida. Caso essa condição seja verdadeira, o programa executa o bloco do elif.`;
  }
  if (/^else\s*:/.test(normalized)) return "Executa o bloco seguinte quando nenhuma das condições anteriores foi atendida.";
  if (/^for\s+/.test(normalized)) {
    const match = /^for\s+([A-Za-z_$][\w$]*)\s+in\s+(.+?):$/.exec(normalized);
    if (match) {
      return `Percorre cada item de ${c(match[2])}. A cada repetição, a variável ${b(match[1])} recebe um item diferente para ser usado no bloco abaixo.`;
    }
    return `Repete o bloco abaixo para cada item da coleção indicada. A variável da iteração recebe um valor diferente em cada repetição.`;
  }
  if (/^while\s+/.test(normalized)) {
    const condition = normalized.slice(5, -1).trim();
    return `Repete o bloco enquanto a condição ${c(condition)} continuar verdadeira. Quando ela ficar falsa, o loop termina e o programa segue para a próxima instrução.`;
  }
  if (/^try\s*:/.test(normalized)) return "Inicia um bloco de código que pode gerar um erro. O programa tentará executar essas instruções e verificará se ocorre alguma exceção.";
  if (/^except\s+/.test(normalized)) {
    const type = normalized.match(/^except\s+([A-Za-z_$][\w$]*)/)[1];
    return `Captura uma exceção do tipo ${b(type)}, que pode acontecer dentro do bloco try. Assim, o programa pode mostrar uma mensagem ou tomar outra decisão sem encerrar abruptamente.`;
  }
  if (/^with\s+/.test(normalized)) return `Abre ou controla o recurso indicado por ${c(normalized.slice(4, -1).trim())}. Ao sair do bloco, o programa tenta fechar esse recurso automaticamente.`;
  return `Controla o fluxo do programa: ${c(normalized)} determina quando este bloco será executado.`;
}

function explainCall(value, context) {
  const { functionName } = context;
  const match = /([A-Za-z_$][\w$.]*)\s*\((.*)\)\s*;?$/.exec(value);
  if (!match) return "Chama um código externo que executa uma ação específica.";
  const [, target, argumentsText] = match;
  const args = argumentsText.trim();
  if (target.includes(".")) return `Chama o método ${b(target.split(".").at(-1))} no objeto ${b(target.slice(0, target.lastIndexOf(".")) || "atual")}. ${args ? `O argumento informado é ${c(args)}.` : "A chamada não precisa de argumentos."}`;
  return `Chama a função ${b(target)}${args ? ` com o argumento ${c(args)}` : " sem argumentos"}. Essa chamada executa o código definido pela função.`;
}

function explainPurpose(value, className, functionName, currentFunction) {
  if (/\bappend\(/.test(value)) return "adiciona um novo item à coleção";
  if (/\blower\(/.test(value)) return "transforma o texto em letras minúsculas para comparação ou apresentação";
  if (/\bstrip\(/.test(value)) return "remove espaços extras no início e no fim do texto";
  if (/\bsplit\(/.test(value)) return "divide o texto em partes";
  if (/\bsort\(/.test(value)) return "organiza os elementos da lista";
  if (/\bget\(/.test(value)) return "obtém um valor indicado pela chave";
  if (/\bopen\(/.test(value)) return "abre um arquivo para leitura ou escrita";
  if (className && functionName) return `usa o estado da classe ${b(className)} dentro da função ${b(functionName)}`;
  if (currentFunction) return "participa da execução da função atual";
  return "faz parte da execução do programa";
}

export function explainOne(t, context = {}) {
  return explainContext(t, { ...context, attributes: context.attributes || new Map(), variables: context.variables || new Map() });
}

export function explainLines(code) {
  const analyzed = analyzeProgram(code);
  return analyzed.map(({ code: original, trimmed, context, index }) => {
    const explanation = explainContext(original, context);
    return { code: original, exp: explanation, line: index + 1, trimmed, context };
  });
}

export function analyzeExplanation(code) {
  const lines = explainLines(code);
  const classes = [...new Set(lines.map((line) => line.context?.className).filter(Boolean))];
  const functions = [...new Set(lines.map((line) => line.context?.functionName).filter(Boolean))];
  const concepts = [];

  if (classes.length) concepts.push(`${classes.length} classe${classes.length > 1 ? "s" : ""}: ${classes.join(", ")}.`);
  if (functions.length) concepts.push(`${functions.length} função${functions.length > 1 ? "es" : ""}: ${functions.join(", ")}.`);
  if (/if\b|elif\b|else\b/.test(code)) concepts.push("Estruturas condicionais que decidem qual bloco executar.");
  if (/for\b|while\b/.test(code)) concepts.push("Loops que repetem instruções para vários itens ou enquanto uma condição continuar.");
  if (/try\b|except\b/.test(code)) concepts.push("Tratamento de erros para evitar que o programa interrompa sem aviso.");
  if (/\.\w+\(/.test(code)) concepts.push("Chamadas de métodos ou funções que executam ações específicas.");

  const summary = [
    classes.length ? `O programa define a classe ${classes.join(", ")}.` : "O programa não define uma classe.",
    functions.length ? `As funções ${functions.join(", ")} organizam as ações do programa.` : "Não há funções definidas no trecho.",
    "A leitura segue a ordem das linhas, respeitando a estrutura de cada classe e função.",
  ].join(" ");

  return {
    summary,
    concepts,
    problems: [],
    lines,
  };
}

export function describeValue(v) {
  v = (v || "").trim().replace(/;$/, "");
  if (v === "") return "um valor vazio";
  if (/(?:^|\s)not\s+/.test(v)) return `o resultado da condição ${c(v)}`;
  if (/^["'`]/.test(v)) return `o texto ${c(v)}`;
  if (/^-?\d+(\.\d+)?$/.test(v)) return `o número ${b(v)}`;
  if (/^\[/.test(v)) return "a lista indicada";
  if (/^\{/.test(v)) return "o objeto indicado";
  if (/^(true|false|True|False)$/.test(v)) return `o valor booleano ${b(v)}`;
  if (/^(null|None|undefined|nil)$/.test(v)) return `um valor vazio (${b(v)})`;
  if (/^new\s+/.test(v)) return `um novo objeto criado com ${c(v)}`;
  if (/=>|^function|^lambda/.test(v)) return "uma função";
  if (/[+\-*/%]|>=|<=|==|>|</.test(v)) return `o resultado de ${c(v)}`;
  if (/[()]/.test(v)) return `o resultado de ${c(v)}`;
  return `o valor de ${c(v)}`;
}
