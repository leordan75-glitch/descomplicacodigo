/* =========================================================
   Biblioteca de conteúdo.
   Para adicionar um tema: acrescente um objeto no array.
   Campos: id (único), title, ico (emoji), cat (categoria),
           summary, body (HTML simples), example { lang, code }.
   ========================================================= */
export const LIBRARY = [
  {
    id: "variaveis", title: "Variáveis", ico: "📦", cat: "Fundamentos",
    summary: "Onde guardamos informações no programa.",
    body: `<p>Uma <b>variável</b> é como uma caixinha com nome onde guardamos um valor para usar depois. Você cria a caixa, dá um nome e coloca algo dentro.</p>
<h3>Tipos comuns de valor</h3>
<ul><li><b>Número</b>: 10, 3.14</li><li><b>Texto (string)</b>: "Olá"</li><li><b>Booleano</b>: true / false</li></ul>
<h3>const, let e var</h3>
<ul><li><b>const</b>: valor que não muda.</li><li><b>let</b>: valor que pode mudar.</li><li><b>var</b>: forma antiga, evite.</li></ul>`,
    example: { lang: "javascript", code: `const nome = "Ana"; // texto que não muda
let idade = 17;     // número que pode mudar
idade = 18;         // agora a Ana fez aniversário 🎂
console.log(nome, idade);` },
  },
  {
    id: "loops", title: "Loops", ico: "🔁", cat: "Fundamentos",
    summary: "Repetir uma ação várias vezes sem copiar código.",
    body: `<p>Um <b>loop</b> repete um bloco de código enquanto uma condição for verdadeira. Ótimo para percorrer listas ou repetir tarefas.</p>
<h3>Principais tipos</h3>
<ul><li><b>for</b>: quando você sabe quantas vezes repetir.</li><li><b>while</b>: repete enquanto algo for verdade.</li><li><b>for...of</b>: percorre item a item de uma lista.</li></ul>`,
    example: { lang: "javascript", code: `// imprime de 1 até 5
for (let i = 1; i <= 5; i++) {
  console.log("Número " + i);
}` },
  },
  {
    id: "vetores", title: "Vetores (Arrays)", ico: "📚", cat: "Estruturas de dados",
    summary: "Uma lista de valores guardados em ordem.",
    body: `<p>Um <b>vetor</b> (ou array) guarda vários valores numa única variável, cada um numa posição (índice). O primeiro índice é <b>0</b>.</p>
<h3>Operações comuns</h3>
<ul><li><code>push</code>: adiciona no fim</li><li><code>length</code>: quantidade de itens</li><li><code>[0]</code>: acessa pela posição</li></ul>`,
    example: { lang: "javascript", code: `const frutas = ["maçã", "banana", "uva"];
frutas.push("manga");       // adiciona no fim
console.log(frutas[0]);     // "maçã" (primeira posição)
console.log(frutas.length); // 4` },
  },
  {
    id: "matrizes", title: "Matrizes", ico: "🔢", cat: "Estruturas de dados",
    summary: "Vetores dentro de vetores — como uma tabela.",
    body: `<p>Uma <b>matriz</b> é um vetor de vetores. Pense numa tabela com linhas e colunas. Acessamos com dois índices: <code>[linha][coluna]</code>.</p>`,
    example: { lang: "python", code: `tabela = [
    [1, 2, 3],
    [4, 5, 6]
]
print(tabela[0][2])  # 3 -> linha 0, coluna 2
print(tabela[1][0])  # 4 -> linha 1, coluna 0` },
  },
  {
    id: "objetos", title: "Objetos", ico: "🧩", cat: "Fundamentos",
    summary: "Agrupam dados relacionados com nomes (chave: valor).",
    body: `<p>Um <b>objeto</b> guarda informações em pares <b>chave: valor</b>. É ótimo para representar coisas do mundo real, como uma pessoa.</p>`,
    example: { lang: "javascript", code: `const pessoa = {
  nome: "Lucas",
  idade: 20,
  programa: true
};
console.log(pessoa.nome);  // "Lucas"
console.log(pessoa.idade); // 20` },
  },
  {
    id: "classes", title: "Classes", ico: "🏗️", cat: "Programação Orientada a Objetos",
    summary: "Um “molde” para criar objetos parecidos.",
    body: `<p>Uma <b>classe</b> é um modelo para criar objetos. Ela define quais dados (atributos) e ações (métodos) esses objetos terão.</p>
<ul><li><b>constructor</b>: prepara o objeto quando ele é criado.</li><li><b>método</b>: uma função dentro da classe.</li></ul>`,
    example: { lang: "javascript", code: `class Cachorro {
  constructor(nome) {
    this.nome = nome;
  }
  latir() {
    console.log(this.nome + " diz: Au au!");
  }
}
const rex = new Cachorro("Rex");
rex.latir(); // Rex diz: Au au!` },
  },
  {
    id: "apis", title: "APIs", ico: "🔌", cat: "Web",
    summary: "Como programas conversam entre si pela internet.",
    body: `<p>Uma <b>API</b> é uma “ponte” que permite um programa pedir dados a outro. Você faz uma requisição e recebe uma resposta (geralmente em JSON).</p>
<ul><li><b>GET</b>: buscar dados</li><li><b>POST</b>: enviar dados</li><li><b>JSON</b>: formato de texto para trocar informação</li></ul>`,
    example: { lang: "javascript", code: `// busca dados de uma API
const resp = await fetch("https://api.exemplo.com/usuarios");
const dados = await resp.json();
console.log(dados);` },
  },
  {
    id: "bancodedados", title: "Banco de Dados", ico: "🗄️", cat: "Backend",
    summary: "Onde os dados ficam guardados de forma organizada.",
    body: `<p>Um <b>banco de dados</b> guarda informações de forma permanente e organizada. Há dois grandes tipos:</p>
<ul><li><b>Relacional (SQL)</b>: tabelas com linhas e colunas (MySQL, PostgreSQL).</li><li><b>Não relacional (NoSQL)</b>: documentos flexíveis (Firebase, MongoDB).</li></ul>`,
    example: { lang: "sql", code: `SELECT nome, idade
FROM usuarios
WHERE idade >= 18
ORDER BY nome;` },
  },
  {
    id: "git", title: "Git", ico: "🌿", cat: "Ferramentas",
    summary: "Controle de versões: o “histórico” do seu código.",
    body: `<p><b>Git</b> salva versões do seu projeto ao longo do tempo. Você pode voltar no tempo, ver o que mudou e trabalhar em equipe sem bagunça.</p>
<ul><li><b>commit</b>: salva um ponto no histórico</li><li><b>branch</b>: uma linha de trabalho paralela</li><li><b>merge</b>: junta mudanças</li></ul>`,
    example: { lang: "bash", code: `git init                        # inicia o repositório
git add .                       # prepara os arquivos
git commit -m "Primeiro commit" # salva a versão` },
  },
  {
    id: "github", title: "GitHub", ico: "🐙", cat: "Ferramentas",
    summary: "A “nuvem” onde você guarda e compartilha código com Git.",
    body: `<p><b>GitHub</b> é um site que hospeda seus repositórios Git na nuvem. Serve para backup, portfólio e colaboração com outras pessoas.</p>
<ul><li><b>push</b>: envia seu código para o GitHub</li><li><b>pull</b>: baixa as novidades</li><li><b>Pull Request</b>: propõe mudanças para revisão</li></ul>`,
    example: { lang: "bash", code: `git remote add origin https://github.com/voce/projeto.git
git push -u origin main   # envia para o GitHub` },
  },
  {
    id: "firebase", title: "Firebase", ico: "🔥", cat: "Backend",
    summary: "Backend pronto do Google: banco, login e hospedagem.",
    body: `<p><b>Firebase</b> oferece serviços prontos para seu app não precisar de um servidor do zero: banco de dados em tempo real (Firestore), autenticação (login) e hospedagem.</p>`,
    example: { lang: "javascript", code: `import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore();
await addDoc(collection(db, "mensagens"), {
  texto: "Olá!", criadoEm: Date.now()
});` },
  },
  {
    id: "nextjs", title: "Next.js", ico: "▲", cat: "Frameworks",
    summary: "Framework React para sites rápidos e completos.",
    body: `<p><b>Next.js</b> é um framework baseado em React que facilita criar sites com rotas automáticas, renderização no servidor e APIs no mesmo projeto.</p>
<ul><li>Cada arquivo em <code>app/</code> vira uma página/rota.</li><li>Ótimo desempenho e SEO “de fábrica”.</li></ul>`,
    example: { lang: "javascript", code: `// app/page.js -> vira a página inicial "/"
export default function Home() {
  return <h1>Olá, Next.js!</h1>;
}` },
  },
  {
    id: "react", title: "React", ico: "⚛️", cat: "Frameworks",
    summary: "Biblioteca para criar interfaces com componentes.",
    body: `<p><b>React</b> monta a interface a partir de <b>componentes</b> reutilizáveis. Quando os dados mudam (o “estado”), a tela se atualiza sozinha.</p>
<ul><li><b>Componente</b>: uma função que devolve a interface (JSX).</li><li><b>useState</b>: guarda dados que mudam.</li></ul>`,
    example: { lang: "javascript", code: `import { useState } from "react";

function Contador() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>Cliques: {n}</button>;
}` },
  },
  {
    id: "html", title: "HTML", ico: "🧱", cat: "Web",
    summary: "A estrutura das páginas — o “esqueleto”.",
    body: `<p><b>HTML</b> define o conteúdo e a estrutura de uma página com <b>tags</b>. Cada tag tem um significado: título, parágrafo, imagem, link…</p>`,
    example: { lang: "html", code: `<h1>Meu site</h1>
<p>Bem-vindo ao <strong>DescomplicaCódigo</strong>!</p>
<a href="https://exemplo.com">Ir para o site</a>` },
  },
  {
    id: "css", title: "CSS", ico: "🎨", cat: "Web",
    summary: "O estilo visual — cores, tamanhos e layout.",
    body: `<p><b>CSS</b> deixa a página bonita: define cores, fontes, espaçamentos e posicionamento. Você seleciona elementos e aplica estilos a eles.</p>`,
    example: { lang: "css", code: `.botao {
  background: #2563eb;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
}` },
  },
  {
    id: "javascript", title: "JavaScript", ico: "✨", cat: "Linguagens",
    summary: "A linguagem que dá vida e interação às páginas.",
    body: `<p><b>JavaScript</b> é a linguagem que roda no navegador e torna as páginas interativas: responder a cliques, validar formulários, buscar dados e muito mais.</p>`,
    example: { lang: "javascript", code: `const botao = document.querySelector("button");
botao.addEventListener("click", () => {
  alert("Você clicou! 👋");
});` },
  },
];
