/* =========================================================
   Conteúdo da Home e do chat (textos curtos)
   ========================================================= */

export const HERO_CODE = `// Pergunte em português, entenda de verdade 💡
const nota = 8.5;

if (nota >= 7) {
  console.log("Aprovado! 🎉");
} else {
  console.log("Precisa revisar.");
}`;

/** Cards "O que você pode fazer". `prompt` pré-preenche o chat ao clicar. */
export const FEATURES = [
  { ico: "list", title: "Explicação linha por linha", desc: "Cada linha do seu código explicada de forma simples, com a lógica por trás.", prompt: "Explique esse código linha por linha:\n" },
  { ico: "wrench", title: "Correção automática", desc: "Encontra o erro, mostra onde está, explica o porquê e entrega o código corrigido.", prompt: "Por que esse código está dando erro?\n" },
  { ico: "sparkles", title: "Criação de código", desc: "Peça uma solução funcional em JavaScript, Python ou outra linguagem e receba uma primeira versão pronta.", prompt: "Crie uma função que calcula a média de notas:\n" },
  { ico: "swap", title: "Conversão entre linguagens", desc: "Converta entre JavaScript e Python (outras linguagens com IA real conectada).", prompt: "Converta esse código para Python:\n" },
  { ico: "alert", title: "Explicação de erros", desc: "Traduz mensagens de erro assustadoras para uma linguagem que você entende.", prompt: "O que significa NullPointerException?" },
  { ico: "target", title: "Exercícios guiados", desc: "Pratique com desafios por dificuldade e veja a solução comentada.", nav: "exercicios" },
];

/** Sugestões na tela de boas-vindas do chat. */
export const PROMPT_CHIPS = [
  { ico: "alert", text: "Por que esse código está dando erro?\nconsole.log(nome)" },
  { ico: "list", text: "Explique esse código linha por linha:\nfor (let i = 1; i <= 3; i++) {\n  console.log(i);\n}" },
  { ico: "swap", text: "Converta para Python:\nconst idade = 18;\nif (idade >= 18) {\n  console.log(\"Maior de idade\");\n}" },
  { ico: "sparkles", text: "Como melhorar esse código?\nvar x = 10;\nif (x == \"10\") { console.log(\"igual\") }" },
];
