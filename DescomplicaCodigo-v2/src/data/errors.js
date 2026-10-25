/* =========================================================
   Erros comuns — explicação simples.
   `keys`: termos (em minúsculas) que fazem o chat reconhecer o erro.
   `detail` e `fix` aceitam HTML simples (<b>, <code>, <i>).
   ========================================================= */
export const ERRORS = [
  {
    name: "NullPointerException", lang: "Java", keys: ["nullpointerexception", "null pointer", "npe"],
    simple: "Você tentou usar um objeto que ainda não foi criado (está “nulo”/vazio).",
    detail: "Acontece quando uma variável que deveria apontar para um objeto está com o valor <b>null</b> e você tenta acessar um método ou atributo dela.",
    fix: "Verifique se o objeto foi criado (com <code>new</code>) antes de usá-lo. Você também pode checar <code>if (obj != null)</code> antes de acessar.",
  },
  {
    name: "SyntaxError", lang: "Geral", keys: ["syntaxerror", "syntax error", "erro de sintaxe"],
    simple: "Tem algo escrito de forma errada — como um parêntese, aspas ou dois-pontos faltando.",
    detail: "O interpretador não conseguiu <i>entender</i> seu código porque a “gramática” da linguagem foi quebrada.",
    fix: "Leia a linha indicada na mensagem. Procure parênteses/chaves não fechados, aspas faltando ou vírgulas fora do lugar.",
  },
  {
    name: "TypeError: undefined is not a function", lang: "JavaScript", keys: ["is not a function", "typeerror"],
    simple: "Você chamou algo como se fosse uma função, mas ele não é uma função.",
    detail: "Geralmente é um nome digitado errado, ou você está usando um método que não existe naquele valor.",
    fix: "Confira o nome do método e se a variável tem o valor que você espera. Use <code>console.log</code> para inspecionar antes da chamada.",
  },
  {
    name: "ReferenceError: x is not defined", lang: "JavaScript", keys: ["referenceerror", "is not defined"],
    simple: "Você usou uma variável ou função que não existe naquele ponto do código.",
    detail: "O JavaScript procurou esse nome e não encontrou nenhuma declaração com <code>const</code>, <code>let</code>, <code>var</code> ou <code>function</code>.",
    fix: "Declare a variável antes de usar e confira se o nome está escrito exatamente igual (maiúsculas contam!).",
  },
  {
    name: "IndexError: list index out of range", lang: "Python", keys: ["indexerror", "index out of range"],
    simple: "Você tentou acessar uma posição que não existe na lista.",
    detail: "Listas começam no índice 0. Se ela tem 3 itens, os índices válidos são 0, 1 e 2 — o índice 3 já está “fora”.",
    fix: "Confira o tamanho com <code>len(lista)</code> e garanta que o índice seja menor que ele.",
  },
  {
    name: "NameError: name is not defined", lang: "Python", keys: ["nameerror"],
    simple: "Você usou uma variável que ainda não foi criada (ou escreveu o nome errado).",
    detail: "O Python procurou por esse nome e não encontrou nada declarado com ele até aquele ponto.",
    fix: "Declare a variável antes de usá-la e confira se o nome está escrito exatamente igual (maiúsculas contam!).",
  },
  {
    name: "IndentationError", lang: "Python", keys: ["indentationerror", "indentação", "indentacao", "identação"],
    simple: "A indentação (os espaços no início da linha) está errada.",
    detail: "No Python, os espaços definem os blocos de código. Misturar tabs e espaços ou errar o alinhamento quebra tudo.",
    fix: "Padronize com 4 espaços por nível. Evite misturar Tab e Espaço.",
  },
  {
    name: "CORS blocked", lang: "Web", keys: ["cors", "access-control-allow-origin"],
    simple: "O navegador bloqueou uma requisição para outro site por segurança.",
    detail: "CORS é uma regra de segurança: um site só pode chamar outro se o servidor de destino permitir explicitamente.",
    fix: "O servidor precisa enviar o cabeçalho <code>Access-Control-Allow-Origin</code>. Em testes, use um proxy ou configure o backend.",
  },
  {
    name: "404 Not Found", lang: "Web", keys: ["404", "not found"],
    simple: "O endereço que você pediu não foi encontrado no servidor.",
    detail: "A rota/URL não existe, foi digitada errada ou o recurso foi movido.",
    fix: "Verifique a URL, o caminho do arquivo e se a rota realmente existe no servidor.",
  },
  {
    name: "Segmentation fault", lang: "C/C++", keys: ["segmentation fault", "segfault"],
    simple: "O programa tentou acessar uma parte da memória que não podia.",
    detail: "Comum ao usar ponteiros inválidos, acessar índices fora de um vetor ou desreferenciar ponteiro nulo.",
    fix: "Confira ponteiros antes de usar, limites de vetores e alocações de memória.",
  },
];

/** Encontra um erro conhecido mencionado no texto (ou null). */
export function findError(text) {
  const low = text.toLowerCase();
  return ERRORS.find((e) => e.keys.some((k) => low.includes(k))) || null;
}
