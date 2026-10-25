# 💡 DescomplicaCódigo

> **Aprender programação nunca foi tão simples.**

Plataforma web para iniciantes: explica códigos linha por linha, corrige erros, sugere melhorias, converte entre linguagens e ensina lógica com biblioteca e exercícios.

---

## 🚀 Como rodar

O projeto usa **JavaScript puro com módulos ES** e Vite. Rode:

```bash
npm install
npm run dev
```

Para gerar a versão final otimizada: `npm run build` (sai na pasta `dist/`).

## 🔐 Login real com Firebase

O acesso exige uma conta com endereço `@gmail.com` e senha com pelo menos 8 caracteres. A confirmação do endereço não é obrigatória. A autenticação é feita pelo Firebase Authentication; sem configurar o Firebase, o site permanece bloqueado na tela de configuração.

1. Crie um projeto em [Firebase Console](https://console.firebase.google.com/).
2. Em **Authentication → Sign-in method**, habilite **Email/Password**.
3. Em **Configurações do projeto → Seus apps**, crie um app Web e copie `apiKey`, `authDomain`, `projectId` e `appId`.
4. Copie `.env.example` para `.env.local` e substitua os valores `cole_...` / `seu-projeto` pelas credenciais do app Web.
5. Reinicie `npm run dev`. Para publicar, cadastre as mesmas quatro variáveis no painel do provedor de hospedagem e gere novamente `npm run build`.
6. Depois de publicar, adicione o domínio do site em **Authentication → Settings → Authorized domains** no Firebase.

As credenciais de configuração do app Web identificam o projeto e não são uma senha administrativa. Nunca coloque chaves privadas de serviços ou credenciais de servidor no frontend.

Nas configurações da conta, cada usuário pode alterar o nome e a senha. O site não usa verificação em duas etapas. Se o projeto Firebase estiver configurado para exigir MFA ou uma conta ainda tiver um segundo fator cadastrado, essa exigência precisa ser removida também no Firebase Authentication para que o login simples com Gmail e senha funcione.

---

## 📁 Estrutura

```
descomplica-codigo/
├── index.html              → esqueleto de todas as telas
├── package.json            → Vite (opcional)
└── src/
    ├── main.js             → liga tudo na ordem certa
    ├── assets/             → favicon e imagens
    ├── styles/             → visual
    │   ├── main.css        → importa os demais
    │   ├── tokens.css      → 🎨 cores/medidas (tema claro e escuro)
    │   ├── base.css        → reset, foco, utilidades
    │   ├── layout.css      → sidebar, topbar, busca, telas
    │   ├── components.css  → botões, código, modal, toast, listas
    │   └── pages/          → um arquivo por tela
    ├── data/               → 📚 CONTEÚDO (edite aqui, sem mexer em lógica)
    │   ├── library.js      → temas da biblioteca
    │   ├── exercises.js    → exercícios
    │   ├── errors.js       → erros comuns
    │   ├── languages.js    → linguagens suportadas
    │   └── home.js         → textos da home e sugestões do chat
    ├── core/               → utilidades sem tela (DOM, storage, texto/datas, runner = executa o JS dos exercícios)
    ├── ui/                 → ícones, realce de sintaxe, componentes, modal/toast
    ├── app/                → roteador (#telas), tema/menu, estatísticas
    ├── ai/                 → 🧠 "motor de IA"
    │   ├── index.js        → ⭐ generateAnswer() — ponto único para ligar IA real
    │   ├── detect.js       → é código? qual linguagem? qual pedido?
    │   ├── analyze.js      → encontra erros e gera correção
    │   ├── explain.js      → explicação linha por linha
    │   ├── convert.js      → JavaScript ↔ Python
    │   └── responses.js    → monta as respostas em HTML
    └── features/           → uma tela = um arquivo
        home · chat (+histórico) · library · exercises
        dashboard · favorites · search · auth
```

### Onde mexer para cada tarefa

| Quero… | Arquivo |
|---|---|
| Mudar cores / visual | `src/styles/tokens.css` |
| Adicionar tema na biblioteca | `src/data/library.js` |
| Adicionar exercício | `src/data/exercises.js` |
| Adicionar erro conhecido | `src/data/errors.js` |
| Mudar como a "IA" responde | `src/ai/` |
| Ligar uma IA real | `src/ai/index.js` → `generateAnswer()` |
| Criar uma tela nova | `index.html` (`<section class="view" data-view="nome">`) + `src/features/nome.js` + `onEnter("nome", …)` |

---

## 🧠 Sobre a "IA" (modo demonstração)

As respostas são geradas **localmente** por heurísticas. O sistema reconhece:
explicação linha por linha · variáveis não declaradas · parênteses/chaves desbalanceados ·
sugestões de melhoria · conversão JavaScript ↔ Python · erros conhecidos pelo nome.

**Para ligar uma IA real** (ex.: Claude): crie uma função serverless que recebe `{ text, lang }`,
chama a API com a chave secreta **no servidor** e devolve `{ html, plain, lang }`.
Depois troque o corpo de `generateAnswer()` em `src/ai/index.js` por um `fetch` — o resto do app não muda.

---

## 💾 Dados

O login e a confirmação de e-mail são processados pelo Firebase. Histórico, favoritos, exercícios concluídos, rascunhos e estatísticas são separados pela UID de cada conta no `localStorage` deste navegador. Tema e estado do menu são preferências compartilhadas no navegador. Os dados de aprendizado ainda não são sincronizados entre dispositivos.

---

## 🌐 Publicar (grátis)

- **Vercel** ou **Netlify**: importe o repositório (com Node: comando `npm run build`, pasta `dist`) — ou arraste a pasta do projeto.
- **GitHub Pages**: suba a pasta e ative o Pages.
