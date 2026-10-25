import { $, on, esc } from "../core/dom.js";
import { store } from "../core/storage.js";
import { shorten } from "../core/text.js";
import { icon } from "../ui/icons.js";
import { openModal, closeModal, toast } from "../ui/overlay.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, firebaseConfigured } from "../core/firebase.js";
import { navTo } from "../app/router.js";
import { initAccountSettings, openAccountSettings } from "./account-settings.js";

const getUser = () => store.get("user", null);
const gate = $("#authGate");
const gateContent = $("#authGateContent");
let mode = "login";
let notice = "";
let noticeIsError = false;
let updatingProfile = false;
let authStateTimer;

function setNotice(message, isError = false) {
  notice = message;
  noticeIsError = isError;
  const messageBox = $(".auth-gate__message", gateContent);
  if (messageBox) {
    messageBox.textContent = message;
    messageBox.classList.toggle("auth-gate__message--error", isError);
    messageBox.hidden = !message;
  }
}

function renderGate() {
  gate.hidden = false;
  if (!firebaseConfigured) {
    gateContent.innerHTML =
      '<button class="icon-btn auth-gate__close" type="button" data-auth="close" aria-label="Fechar login"><span data-ico="x"></span></button>' +
      '<span class="brand__logo" aria-hidden="true">&lt;/&gt;</span>' +
      "<h1>Configure o Firebase para acessar</h1>" +
      '<p class="auth-gate__setup">O login real precisa de um projeto Firebase. Crie o arquivo <code>.env.local</code> copiando <code>.env.example</code> e preencha as credenciais do app Web. Ative Authentication → Email/Password e reinicie o servidor.</p>' +
      '<p class="auth-gate__setup">Instruções completas: consulte a seção “Login real com Firebase” no README.</p>' +
      '<button class="btn btn--soft btn--block" type="button" data-auth="close">Voltar para a página inicial</button>';
    return;
  }

  const registering = mode === "register";
  gateContent.innerHTML =
    '<button class="icon-btn auth-gate__close" type="button" data-auth="close" aria-label="Fechar login"><span data-ico="x"></span></button>' +
    '<span class="brand__logo" aria-hidden="true">&lt;/&gt;</span>' +
    `<h1>${registering ? "Criar sua conta" : "Entre no DescomplicaCódigo"}</h1>` +
    `<p>${registering ? "Crie sua conta com Gmail e senha." : "Entre com seu Gmail e senha."}</p>` +
    '<p class="auth-gate__message' + (noticeIsError ? " auth-gate__message--error" : "") + '" role="status"' + (notice ? "" : " hidden") + `>${esc(notice)}</p>` +
    '<form data-auth-form>' +
    (registering ? '<div class="field"><label for="authName">Nome</label><input id="authName" name="name" type="text" maxlength="40" autocomplete="name" required /></div>' : "") +
    '<div class="field"><label for="authEmail">Gmail</label><input id="authEmail" name="email" type="email" placeholder="voce@gmail.com" autocomplete="email" required /></div>' +
    '<div class="field"><label for="authPassword">Senha</label><input id="authPassword" name="password" type="password" minlength="8" autocomplete="' + (registering ? "new-password" : "current-password") + '" required /></div>' +
    (registering ? '<div class="field"><label for="authPasswordConfirm">Confirme a senha</label><input id="authPasswordConfirm" name="passwordConfirm" type="password" minlength="8" autocomplete="new-password" required /></div>' : "") +
    `<button class="btn btn--primary btn--block" type="submit">${registering ? "Criar conta" : "Entrar"}</button>` +
    "</form>" +
    (!registering ? '<p class="auth-gate__switch"><button class="auth-gate__link" type="button" data-auth="forgot">Esqueci minha senha</button></p>' : "") +
    `<p class="auth-gate__switch">${registering ? "Já tem uma conta?" : "Ainda não tem conta?"} <button type="button" data-auth="toggle">${registering ? "Entrar" : "Criar usuário"}</button></p>` +
    '<p class="auth-gate__switch"><button class="auth-gate__link" type="button" data-auth="close">Voltar para a página inicial</button></p>' +
    (registering ? '<p class="auth-gate__switch"><button class="auth-gate__link" type="button" data-auth="back-login">Voltar para o login</button></p>' : "");
}

function showSessionTimeout() {
  gate.hidden = false;
  gateContent.innerHTML =
    '<span class="brand__logo" aria-hidden="true">&lt;/&gt;</span>' +
    "<h1>Não foi possível verificar sua sessão</h1>" +
    '<p class="auth-gate__setup">A conexão com o Firebase demorou demais. Verifique sua internet e recarregue a página. Se abriu o arquivo diretamente pelo computador (endereço <code>file://</code>), use o site publicado por HTTPS ou rode o projeto com <code>npm run dev</code>.</p>' +
    '<button class="btn btn--primary btn--block" type="button" data-auth="retry-session">Tentar novamente</button>';
}

function isGmail(email) {
  return /^[^\s@]+@gmail\.com$/i.test(email);
}

function friendlyError(error) {
  const messages = {
    "auth/email-already-in-use": "Este Gmail já tem uma conta. Entre ou recupere sua senha.",
    "auth/invalid-credential": "Gmail ou senha incorretos.",
    "auth/user-not-found": "Não encontramos uma conta com esse Gmail.",
    "auth/wrong-password": "Gmail ou senha incorretos.",
    "auth/weak-password": "A senha precisa ter pelo menos 8 caracteres.",
    "auth/too-many-requests": "Muitas tentativas. Aguarde um pouco e tente novamente.",
    "auth/network-request-failed": "Falha de conexão. Verifique sua internet e tente novamente.",
    "auth/operation-not-allowed": "Ative o método Email/Senha no Firebase Authentication.",
    "auth/invalid-api-key": "A chave do Firebase está incorreta. Confira o arquivo .env.local.",
    "auth/unauthorized-domain": "O domínio deste site não está autorizado no Firebase. Em Authentication → Settings → Authorized domains, adicione descomplicacodigo-14.web.app.",
    "auth/multi-factor-auth-required": "Esta conta ainda exige verificação em duas etapas no Firebase. Desative essa exigência no Firebase ou remova o fator da conta para entrar sem MFA.",
  };
  return messages[error.code] || `Erro de autenticação (${error.code || "desconhecido"}). Confira o Gmail e a senha; se persistir, envie esse código de erro para diagnóstico.`;
}

function renderButton() {
  const user = getUser();
  const btn = $("#loginBtn");
  if (user) {
    btn.className = "user-chip";
    btn.setAttribute("aria-label", `Conta de ${user.name}`);
    btn.innerHTML = `<span class="user-chip__av" aria-hidden="true">${esc(user.name.charAt(0).toUpperCase())}</span><span class="user-chip__name hide-sm">${esc(shorten(user.name, 12))}</span>`;
  } else {
    btn.className = "btn btn--ghost";
    btn.removeAttribute("aria-label");
    btn.innerHTML = `${icon("user")}<span class="hide-sm">Entrar</span>`;
  }
}

async function logout() {
  closeModal();
  try {
    store.setUserScope(null);
    await signOut(auth);
    store.remove("user");
    toast("Você saiu.");
  } catch {
    toast("Não foi possível sair. Tente novamente.");
  }
}

function openAccount() {
  const user = getUser();
  if (user) {
    openModal(
      `<h2>${icon("user")} Olá, ${esc(user.name)}!</h2>` +
      "<p class='lead'>Conta: " + esc(user.email) + ". Seu histórico e progresso ficam salvos neste navegador.</p>" +
      "<div class='modal__actions'><button class='btn btn--soft' type='button' data-auth='settings'>Configurações</button><button class='btn btn--soft' type='button' data-auth='logout'>Sair</button></div>",
    );
  } else {
    mode = "login";
    notice = "";
    renderGate();
  }
}

export function initAuth() {
  renderButton();
  $("#loginBtn").addEventListener("click", openAccount);
  const modal = $("#modal");
  on(modal, "click", "[data-auth='logout']", () => { void logout(); });
  on(modal, "click", "[data-auth='settings']", () => openAccountSettings());
  initAccountSettings();
  on(gate, "click", "[data-auth='toggle']", () => {
    mode = mode === "register" ? "login" : "register";
    notice = "";
    renderGate();
  });
  on(gate, "click", "[data-auth='back-login']", () => {
    mode = "login";
    notice = "";
    renderGate();
  });
  on(gate, "click", "[data-auth='close']", () => {
    gate.hidden = true;
    navTo("inicio");
  });
  on(gate, "click", "[data-auth='retry-session']", () => location.reload());
  on(gate, "click", "[data-auth='forgot']", async () => {
    const email = $("#authEmail").value.trim().toLowerCase();
    if (!isGmail(email)) {
      setNotice("Informe seu endereço @gmail.com para receber a recuperação de senha.", true);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setNotice("Se houver uma conta para esse endereço, enviaremos o link para redefinir a senha.");
    } catch (error) {
      setNotice(friendlyError(error), true);
    }
  });
  on(gate, "submit", "[data-auth-form]", async (e, form) => {
    e.preventDefault();
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");
    const submit = $("button[type='submit']", form);
    if (!isGmail(email)) {
      setNotice("Use um endereço terminado em @gmail.com.", true);
      return;
    }
    if (password.length < 8) {
      setNotice("A senha precisa ter pelo menos 8 caracteres.", true);
      return;
    }

    submit.disabled = true;
    submit.textContent = "Aguarde…";
    try {
      if (mode === "register") {
        const name = String(data.get("name") || "").trim();
        const confirmation = String(data.get("passwordConfirm") || "");
        if (!name) throw new Error("Informe seu nome.");
        if (password !== confirmation) {
          setNotice("As senhas não são iguais. Corrija a confirmação e tente novamente.", true);
          return;
        }
        updatingProfile = true;
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: name });
        store.setUserScope(credential.user.uid);
        location.reload();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      updatingProfile = false;
      setNotice(error.message && !error.code ? error.message : friendlyError(error), true);
      submit.disabled = false;
      submit.textContent = mode === "register" ? "Criar conta" : "Entrar";
    }
  });

  if (!firebaseConfigured) {
    return;
  }

  authStateTimer = setTimeout(showSessionTimeout, 12000);
  try {
    onAuthStateChanged(auth, async (user) => {
      clearTimeout(authStateTimer);
      try {
        if (user) {
          if (updatingProfile) return;
          if (store.setUserScope(user.uid)) {
            location.reload();
            return;
          }
          const name = user.displayName || user.email.split("@")[0];
          store.set("user", { name, email: user.email, provider: "email" });
          gate.hidden = true;
          renderButton();
          return;
        }
        if (store.setUserScope(null)) {
          location.reload();
          return;
        }
        store.remove("user");
        renderButton();
        if (gate.hidden) {
          mode = "login";
          notice = "";
        }
      } catch (error) {
        console.error("Falha ao restaurar a sessão Firebase:", error);
        showSessionTimeout();
      }
    });
  } catch (error) {
    clearTimeout(authStateTimer);
    console.error("Não foi possível iniciar o Firebase Auth:", error);
    showSessionTimeout();
  }
}
