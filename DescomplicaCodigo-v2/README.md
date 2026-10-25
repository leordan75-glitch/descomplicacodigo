# 💡 DescomplicaCódigo

> **Aprender programação nunca foi tão simples.**

O **DescomplicaCódigo** é uma plataforma web desenvolvida para auxiliar pessoas que estão começando a aprender programação. O objetivo é tornar o aprendizado mais acessível, oferecendo recursos para consultar conteúdos, tirar dúvidas sobre códigos, praticar exercícios e acompanhar o próprio progresso.

A plataforma reúne diferentes ferramentas em um só lugar, permitindo que o usuário estude conceitos de programação, consulte explicações, organize conteúdos importantes e acompanhe suas atividades.

🌐 **Site publicado:** https://descomplicacodigo-14.web.app/

📂 **Repositório:** https://github.com/leordan75-glitch/descomplicacodigo

---

## 🎯 Objetivo do projeto

O projeto foi desenvolvido para reduzir as dificuldades encontradas por iniciantes durante o aprendizado de programação.

Muitas pessoas têm dificuldade para entender o funcionamento de um código, identificar erros, compreender conceitos básicos e saber como continuar estudando. O DescomplicaCódigo busca ajudar nesse processo por meio de uma interface que reúne ferramentas de consulta, prática e acompanhamento.

Entre os objetivos da plataforma estão:

- Facilitar a compreensão de códigos de programação.
- Auxiliar na identificação e correção de erros.
- Disponibilizar conteúdos para consulta e estudo.
- Oferecer exercícios para praticar os conhecimentos.
- Permitir que o usuário consulte interações anteriores e salve conteúdos importantes.
- Organizar recursos de aprendizado em uma única plataforma.

## 🚀 Funcionalidades da plataforma

A plataforma possui diferentes áreas, cada uma destinada a uma parte da experiência de aprendizado.

### 🏠 Início

É a página principal da plataforma. Ela funciona como ponto de entrada para os recursos disponíveis e ajuda o usuário a encontrar as ferramentas de estudo.

### 💬 Perguntar

Área destinada ao envio de dúvidas relacionadas à programação. O usuário pode inserir perguntas ou códigos para obter respostas e orientações que auxiliem na compreensão do problema.

### 📚 Biblioteca

Espaço dedicado à consulta de conteúdos de programação. A biblioteca serve como apoio para revisar conceitos e encontrar informações durante os estudos.

### 📝 Exercícios

Área voltada à prática dos conhecimentos adquiridos. Os exercícios permitem trabalhar conceitos de programação e desenvolver o raciocínio lógico.

### 📊 Dashboard

Painel que reúne informações relacionadas à atividade do usuário e ao acompanhamento do aprendizado, conforme os dados disponibilizados pela aplicação.

### 🕘 Histórico

Área destinada à consulta de interações anteriores, facilitando o acesso a perguntas e conteúdos utilizados anteriormente.

### ⭐ Favoritos

Permite reunir conteúdos considerados importantes para facilitar o acesso posterior.

---

## 🧠 Sistema de perguntas e respostas

O recurso de perguntas e respostas é uma das principais partes do DescomplicaCódigo.

A proposta é auxiliar o usuário na compreensão de códigos e problemas de programação, oferecendo orientações em uma linguagem acessível para quem está começando.

Entre os tipos de ajuda previstos na proposta do projeto estão:

- Explicação de trechos de código.
- Orientação para compreender erros de programação.
- Sugestões de melhoria no código.
- Apoio ao aprendizado de lógica de programação.
- Auxílio na compreensão de diferentes linguagens.

**Importante:** a qualidade e os tipos de resposta dependem da implementação atual do sistema. A presença da interface de perguntas e respostas não significa, por si só, que exista um modelo de inteligência artificial externo conectado.

---

## 🛠️ Tecnologias utilizadas

O arquivo `package.json` da versão apresentada utiliza as seguintes tecnologias e ferramentas:

| Tecnologia | Finalidade |
|---|---|
| JavaScript | Implementação da lógica da aplicação. |
| Vite | Desenvolvimento local e geração da versão de produção. |
| Firebase | Integração com serviços da plataforma Firebase. |
| HTML | Estrutura das páginas e dos elementos da interface. |
| CSS | Estilização e apresentação visual. |
| npm | Instalação e gerenciamento das dependências do projeto. |

A configuração apresentada utiliza Vite, e não Next.js. O uso de Tailwind CSS também precisa ser confirmado nas dependências e nos arquivos de estilo antes de ser listado como tecnologia utilizada.

---

## 📂 Organização do projeto

O código-fonte está organizado dentro do repositório GitHub, na pasta `DescomplicaCodigo-v2`.

Os arquivos de configuração, como `package.json`, definem as dependências e os comandos utilizados durante o desenvolvimento.

### Arquivos e pastas importantes

| Arquivo ou pasta | Finalidade |
|---|---|
| `package.json` | Define informações do projeto, dependências e scripts de execução. |
| `src/` | Pasta utilizada para organizar o código-fonte, caso presente na estrutura atual. |
| `index.html` | Arquivo HTML de entrada, caso utilizado pela configuração atual. |
| `.gitignore` | Define arquivos e pastas que não devem ser enviados ao Git. |
| `.env.example` | Pode servir como modelo de configuração de variáveis de ambiente, caso esteja presente. |

A estrutura exata deve ser consultada diretamente no repositório, pois os nomes e a organização dos arquivos podem mudar conforme a versão do projeto.

---

## ▶️ Como executar o projeto localmente

Para executar o DescomplicaCódigo no computador, é necessário ter o **Node.js** e o **npm** instalados.

### 1. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/leordan75-glitch/descomplicacodigo.git
```

### 2. Entrar na pasta do projeto

```bash
cd descomplicacodigo/DescomplicaCodigo-v2
```

Esse caminho considera que o diretório `DescomplicaCodigo-v2` contém o `package.json`. Se a estrutura do repositório for diferente, ajuste o caminho.

### 3. Instalar as dependências

```bash
npm install
```

Esse comando instala as bibliotecas declaradas no `package.json`.

### 4. Iniciar o ambiente de desenvolvimento

```bash
npm run dev
```

Na configuração atual baseada em Vite, esse comando inicia o servidor de desenvolvimento. O terminal informa o endereço local que deve ser aberto no navegador.

### 5. Gerar a versão de produção

```bash
npm run build
```

O Vite gera os arquivos otimizados para publicação na pasta `dist/`, conforme a configuração padrão utilizada pelo projeto.

Para visualizar localmente a versão gerada, pode ser utilizado:

```bash
npm run preview
```

---

## 🔥 Integração com Firebase

O `package.json` apresentado inclui a dependência `firebase`. Isso indica que o projeto utiliza a biblioteca Firebase, mas os serviços efetivamente ativos devem ser confirmados no código e nas configurações do projeto.

O Firebase oferece serviços que podem ser utilizados para autenticação, armazenamento de dados e outras funcionalidades. A presença da dependência, isoladamente, não confirma quais desses serviços estão implementados.

Para verificar a configuração, consulte os arquivos de inicialização do Firebase e o painel do projeto no [Firebase Console](https://console.firebase.google.com/).

### Cuidados com as configurações

- Não publique senhas ou credenciais privadas no repositório.
- Não coloque chaves secretas de APIs no código executado pelo navegador.
- Utilize arquivos de ambiente para configurações locais quando a aplicação estiver preparada para isso.
- Confira as regras de segurança dos serviços Firebase utilizados.

---

## 💾 Dados e armazenamento

A aplicação pode utilizar diferentes formas de armazenamento, dependendo de como cada funcionalidade foi implementada.

Para documentar corretamente o comportamento atual, é necessário distinguir:

- **Dados locais:** informações armazenadas no navegador do usuário.
- **Dados remotos:** informações armazenadas em serviços externos.
- **Dados de autenticação:** informações gerenciadas pelo sistema de login, caso esteja implementado.

O local em que ficam o histórico, os favoritos, as atividades e as informações do usuário deve ser confirmado no código. Não é correto afirmar que esses dados são sincronizados entre dispositivos ou separados por conta sem verificar a implementação.

---

## 🌐 Publicação do projeto

A versão publicada do DescomplicaCódigo está disponível pelo Firebase Hosting:

🔗 https://descomplicacodigo-14.web.app/

O repositório GitHub mantém o código-fonte para consulta, manutenção e desenvolvimento.

A publicação e a execução local são processos diferentes: alterações feitas no código local não modificam automaticamente o site publicado. Para disponibilizar uma nova versão, é necessário executar o processo de publicação configurado para o projeto.

---

## 🔧 Manutenção e evolução

O projeto pode receber melhorias conforme as necessidades identificadas durante o desenvolvimento e os testes.

Alguns pontos importantes para a evolução da plataforma são:

- Verificar o funcionamento de todas as telas e seus links.
- Garantir que o layout funcione em computadores e dispositivos móveis.
- Validar os dados enviados pelos formulários.
- Apresentar mensagens claras quando ocorrerem erros.
- Implementar estados visuais de carregamento, sucesso, erro e ausência de conteúdo.
- Melhorar a organização e a reutilização dos componentes.
- Documentar as integrações externas e os requisitos de configuração.
- Testar as funcionalidades antes de publicar novas versões.

---

## 📌 Considerações finais

O DescomplicaCódigo tem como propósito facilitar o aprendizado de programação, reunindo recursos de consulta, perguntas e respostas, exercícios e acompanhamento em uma única plataforma.

A documentação deve acompanhar a evolução do código-fonte, mantendo as informações sobre tecnologias, funcionalidades e configurações alinhadas à versão realmente implementada.

**DescomplicaCódigo — mais clareza para aprender, praticar e evoluir na programação.**
