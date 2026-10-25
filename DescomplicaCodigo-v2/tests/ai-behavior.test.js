import test from "node:test";
import assert from "node:assert/strict";

import { detectIntent } from "../src/ai/detect.js";
import { generateAnswer } from "../src/ai/index.js";

const extractCode = (html) => html.match(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/)?.[1] ?? "";

import { analyzeExplanation, explainLines, explainOne } from "../src/ai/explain.js";

test("detecta pedidos para gerar código", () => {
  assert.equal(detectIntent("Crie uma função em JavaScript que soma dois números").generate, true);
});

test("converte uma quantidade de moeda para o valor em outra moeda", async () => {
  const answer = await generateAnswer("Converta 100 dólares para reais usando uma taxa de 5,20", "javascript");

  assert.match(answer.plain, /gerado/i);
  const code = extractCode(answer.html);
  assert.match(code, /100/i);
  assert.match(code, /5\.2|5,2/);
  assert.match(code, /\breal(?:es)?\b|USD|BRL/i);
  assert.equal(answer.lang, "javascript");
});

test("explica conceitos avançados de forma específica", () => {
  assert.match(explainOne("@dataclass"), /@dataclass|métodos|representar.*classe/i);
  assert.match(explainOne("self.titulo = titulo"), /atribui.*titulo|objeto atual/i);
  assert.match(explainOne("lambda x: x * 2"), /função anônima|função anónima/i);
  assert.match(explainOne("**t"), /recebe|variáveis|argumentos/i);
  assert.match(explainOne("with open(arquivo, \"r\", encoding=\"utf-8\") as f:"), /arquivo|fechar|recurso/i);
  assert.match(explainOne("return tarefa"), /devolve|retorna/i);
});

test("explica linhas específicas sem frases genéricas", () => {
  assert.match(explainOne("id: int"), /id|tipo.*int|variável/i);
  assert.match(explainOne("titulo: str"), /titulo|tipo.*str|variável/i);
  assert.match(explainOne("self.tarefas: List[Tarefa] = []"), /lista vazia|tarefas|List\[Tarefa\]|self/i);
  assert.match(explainOne("self.carregar()"), /carregar|método|objeto atual/i);
  assert.match(explainOne("self.salvar()"), /salvar|método|objeto atual/i);
  assert.match(explainOne("def carregar(self):"), /função|carregar|parâmetro|self/i);
  assert.match(explainOne(""), /linha vazia|organizar/i);
});

test("analisa o contexto completo antes de explicar", () => {
  const code = `class TarefaApp:
    def __init__(self):
        self.tarefas = []

    def carregar(self):
        if not self.tarefas:
            return []

        for tarefa in self.tarefas:
            tarefa.mostrar()
`;
  const explanation = explainLines(code);
  const analysis = analyzeExplanation(code);
  const emptyListCheck = explanation.find((line) => line.trimmed.startsWith("if not self.tarefas"));
  const loop = explanation.find((line) => line.trimmed.startsWith("for tarefa"));
  const showCall = explanation.find((line) => line.trimmed.startsWith("tarefa.mostrar"));

  assert.match(explanation[0].exp, /classe.*TarefaApp|modelo.*objetos/i);
  assert.match(explanation[2].exp, /lista vazia|inicializa.*tarefas|atribui.*tarefas/i);
  assert.ok(emptyListCheck, "deve explicar a condição que verifica se a lista está vazia");
  assert.match(emptyListCheck.exp, /self\.tarefas.*está vazia|está vazia.*self\.tarefas|não houver.*item/i);
  assert.ok(loop, "deve explicar o loop sobre as tarefas");
  assert.match(loop.exp, /percorrer|cada tarefa|tarefa/i);
  assert.ok(showCall, "deve explicar a chamada para mostrar cada tarefa");
  assert.match(showCall.exp, /método.*mostrar|objeto.*tarefa/i);
  assert.match(analysis.summary, /classe TarefaApp|funções __init__|carregar/i);
  assert.match(analysis.concepts.join(" "), /condicionais|loops/i);
  assert.doesNotMatch(emptyListCheck.exp, /condição.*verdadeira|executa esta instrução/i);
});

test("gera código quando o usuário pede para criar uma solução", async () => {
  const answer = await generateAnswer("Crie uma função em JavaScript que soma dois números", "javascript");

  assert.match(answer.plain, /gerado/i);
  assert.ok(extractCode(answer.html).includes("function"));
  assert.equal(answer.lang, "javascript");
});
