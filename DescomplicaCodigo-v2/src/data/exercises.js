/* =========================================================
   Exercícios.
   level: "facil" | "medio" | "dificil"
   statement e explanation aceitam HTML simples.

   Correção automática (só JavaScript, roda no navegador):
     test     → código extra rodado DEPOIS do código do aluno (opcional)
     expected → saída esperada no console (linhas separadas por \n)
   ========================================================= */
export const LEVELS = [
  { id: "facil", label: "Fácil" },
  { id: "medio", label: "Médio" },
  { id: "dificil", label: "Difícil" },
];

export const EXERCISES = [
  // ---- FÁCIL ----
  {
    id: "ex1", level: "facil", title: "Somar dois números", lang: "javascript",
    statement: "Crie uma função chamada <b>somar</b> que receba dois números e devolva a soma dos dois.",
    starter: `function somar(a, b) {
  // seu código aqui
}`,
    solution: `function somar(a, b) {
  return a + b;
}
console.log(somar(3, 5)); // 8`,
    test: `console.log(somar(3, 5));
console.log(somar(-2, 2));`,
    expected: "8\n0",
    explanation: "A função recebe dois valores (a e b) e usa <code>return</code> para devolver a soma. O <code>+</code> junta os dois números.",
    alternatives: [`// forma curta com arrow function
const somar = (a, b) => a + b;`],
  },
  {
    id: "ex2", level: "facil", title: "Par ou ímpar", lang: "javascript",
    statement: "Escreva um código que diga se o número <b>7</b> é par ou ímpar.",
    starter: `const numero = 7;
// verifique aqui`,
    solution: `const numero = 7;
if (numero % 2 === 0) {
  console.log("Par");
} else {
  console.log("Ímpar");
}`,
    expected: "Ímpar",
    explanation: "O operador <code>%</code> (resto da divisão) por 2 dá 0 quando o número é par. Se o resto for diferente de 0, é ímpar.",
    alternatives: [`const numero = 7;
console.log(numero % 2 === 0 ? "Par" : "Ímpar");`],
  },
  {
    id: "ex3", level: "facil", title: "Maior de idade", lang: "python",
    statement: "A idade já está definida como 16. Informe se a pessoa é maior de idade (18+).",
    starter: `idade = 16
# complete aqui`,
    solution: `idade = 16
if idade >= 18:
    print("Maior de idade")
else:
    print("Menor de idade")`,
    explanation: "Usamos <code>if</code> para comparar a idade com 18. Se for maior ou igual, é maior de idade.",
    alternatives: [],
  },

  // ---- MÉDIO ----
  {
    id: "ex4", level: "medio", title: "Somar itens de uma lista", lang: "javascript",
    statement: "Some todos os números do vetor <code>[10, 20, 30, 40]</code> e mostre o total.",
    starter: `const nums = [10, 20, 30, 40];
// some tudo`,
    solution: `const nums = [10, 20, 30, 40];
let total = 0;
for (const n of nums) {
  total += n;
}
console.log(total); // 100`,
    expected: "100",
    explanation: "Começamos o total em 0 e, a cada volta do loop, somamos o item atual. <code>+=</code> é o mesmo que <code>total = total + n</code>.",
    alternatives: [`const nums = [10, 20, 30, 40];
const total = nums.reduce((soma, n) => soma + n, 0);
console.log(total);`],
  },
  {
    id: "ex5", level: "medio", title: "Contar vogais", lang: "python",
    statement: "Conte quantas vogais existem na palavra <b>\"programacao\"</b>.",
    starter: `palavra = "programacao"
# conte as vogais`,
    solution: `palavra = "programacao"
vogais = "aeiou"
total = 0
for letra in palavra:
    if letra in vogais:
        total += 1
print(total)  # 5`,
    explanation: "Percorremos letra por letra. Se a letra estiver dentro do texto <code>\"aeiou\"</code>, contamos +1.",
    alternatives: [`palavra = "programacao"
total = sum(1 for l in palavra if l in "aeiou")
print(total)`],
  },
  {
    id: "ex6", level: "medio", title: "Inverter um texto", lang: "javascript",
    statement: "Inverta a palavra <b>\"código\"</b> (deve virar \"ogidóc\").",
    starter: `const texto = "código";
// inverta`,
    solution: `const texto = "código";
const invertido = texto.split("").reverse().join("");
console.log(invertido);`,
    expected: "ogidóc",
    explanation: "<code>split(\"\")</code> transforma o texto em vetor de letras, <code>reverse()</code> inverte a ordem e <code>join(\"\")</code> junta tudo de volta em texto.",
    alternatives: [`const texto = "código";
const invertido = [...texto].reverse().join("");
console.log(invertido);`],
  },

  // ---- DIFÍCIL ----
  {
    id: "ex7", level: "dificil", title: "Número é primo?", lang: "python",
    statement: "Escreva uma função que diga se um número é primo (só divisível por 1 e por ele mesmo).",
    starter: `def eh_primo(n):
    # seu código`,
    solution: `def eh_primo(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

print(eh_primo(7))  # True`,
    explanation: "Testamos divisores de 2 até a raiz quadrada de n. Se algum divide n sem sobrar resto, não é primo. Ir só até a raiz deixa o código muito mais rápido.",
    alternatives: [],
  },
  {
    id: "ex8", level: "dificil", title: "FizzBuzz", lang: "javascript",
    statement: "De 1 a 15: escreva \"Fizz\" para múltiplos de 3, \"Buzz\" para múltiplos de 5 e \"FizzBuzz\" para múltiplos de ambos.",
    starter: `for (let i = 1; i <= 15; i++) {
  // sua lógica
}`,
    solution: `for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`,
    expected: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
    explanation: "Verificamos primeiro o caso mais específico (divisível por 3 e 5 = por 15). A ordem dos <code>if</code> importa muito aqui!",
    alternatives: [],
  },
  {
    id: "ex9", level: "dificil", title: "Maior palavra da frase", lang: "javascript",
    statement: "Encontre a maior palavra da frase \"aprender programação é divertido\".",
    starter: `const frase = "aprender programação é divertido";`,
    solution: `const frase = "aprender programação é divertido";
const palavras = frase.split(" ");
let maior = "";
for (const p of palavras) {
  if (p.length > maior.length) maior = p;
}
console.log(maior); // "programação"`,
    expected: "programação",
    explanation: "Dividimos a frase em palavras e guardamos sempre a mais longa encontrada até agora, comparando o <code>length</code> (tamanho) de cada uma.",
    alternatives: [`const frase = "aprender programação é divertido";
const maior = frase.split(" ").reduce((a, b) => (b.length > a.length ? b : a));
console.log(maior);`],
  },
  {
    id: "ex10", level: "dificil", title: "É palíndromo?", lang: "python",
    statement: "Verifique se uma frase é um <b>palíndromo</b> (lida igual de trás para frente), ignorando espaços e maiúsculas. Teste com \"Socorram me subi no onibus em Marrocos\".",
    starter: `frase = "Socorram me subi no onibus em Marrocos"
# verifique aqui`,
    solution: `frase = "Socorram me subi no onibus em Marrocos"
limpa = frase.replace(" ", "").lower()
print(limpa == limpa[::-1])  # True`,
    explanation: "Primeiro “limpamos” a frase: tiramos os espaços e deixamos tudo minúsculo. Depois comparamos com ela mesma invertida — <code>[::-1]</code> inverte um texto em Python.",
    alternatives: [`def eh_palindromo(texto):
    limpa = "".join(c.lower() for c in texto if c.isalnum())
    return limpa == limpa[::-1]

print(eh_palindromo("Socorram me subi no onibus em Marrocos"))`],
  },
];
