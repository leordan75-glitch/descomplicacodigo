import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { $, on, esc } from "../core/dom.js";
import { store } from "../core/storage.js";
import { shorten } from "../core/text.js";
import { auth } from "../core/firebase.js";
import { openModal, toast } from "../ui/overlay.js";
import { icon } from "../ui/icons.js";

function errorMessage(error) {
  const messages = {
    "auth/invalid-credential": "Senha atual incorreta.",
    "auth/wrong-password": "Senha atual incorreta.",
    "auth/requires-recent-login": "Por segurança, saia da conta e entre novamente antes de alterar esta configuração.",
    "auth/weak-password": "A nova senha precisa ter pelo menos 8 caracteres.",
    "auth/too-many-requests": "Muitas tentativas. Aguarde e tente novamente.",
  };
  return messages[error.code] || `Não foi possível salvar (${error.code || "erro desconhecido"}). Tente novamente.`;
}

function markup(user, message = "", isError = false) {
  const displayName = user.displayName || user.email.split("@")[0];
  return `<h2>${icon("user")} Configurações da conta</h2>
    <p class="lead">Altere as informações e a senha da sua conta.</p>
    <p class="account-settings__message${isError ? " account-settings__message--error" : ""}" role="status"${message ? "" : " hidden"}>${esc(message)}</p>
    <section class="account-settings__section"><h3>Alterar nome</h3>
      <form data-account-setting="name">
        <div class="field"><label for="profileName">Nome exibido</label><input id="profileName" name="name" type="text" maxlength="40" value="${esc(displayName)}" autocomplete="name" required /></div>
        <button class="btn btn--soft" type="submit">Salvar nome</button>
      </form>
    </section>
    <section class="account-settings__section"><h3>Alterar senha</h3>
      <form data-account-setting="password">
        <div class="field"><label for="currentPassword">Senha atual</label><input id="currentPassword" name="currentPassword" type="password" autocomplete="current-password" required /></div>
        <div class="field"><label for="newPassword">Nova senha (mínimo 8 caracteres)</label><input id="newPassword" name="newPassword" type="password" minlength="8" autocomplete="new-password" required /></div>
        <div class="field"><label for="confirmPassword">Confirme a nova senha</label><input id="confirmPassword" name="confirmPassword" type="password" minlength="8" autocomplete="new-password" required /></div>
        <button class="btn btn--soft" type="submit">Atualizar senha</button>
      </form>
    </section>`;
}

export function openAccountSettings(message = "", isError = false) {
  const user = auth.currentUser;
  if (user) openModal(markup(user, message, isError));
}

function updateAccountChip(user, name) {
  const button = $("#loginBtn");
  if (!button) return;
  button.setAttribute("aria-label", `Conta de ${name}`);
  const avatar = $(".user-chip__av", button);
  const label = $(".user-chip__name", button);
  if (avatar) avatar.textContent = name.charAt(0).toUpperCase();
  if (label) label.textContent = shorten(name, 12);
}

export function initAccountSettings() {
  const modal = $("#modal");
  on(modal, "submit", "[data-account-setting]", async (event, form) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    const action = form.dataset.accountSetting;
    const data = new FormData(form);
    const submit = $("button[type='submit']", form);
    submit.disabled = true;
    submit.textContent = "Salvando…";

    try {
      const currentPassword = String(data.get("currentPassword") || "");
      if (action === "name") {
        const name = String(data.get("name") || "").trim();
        if (!name) throw new Error("O nome não pode ficar vazio.");
        await updateProfile(user, { displayName: name });
        store.set("user", { name, email: user.email, provider: "email" });
        updateAccountChip(user, name);
        toast("Nome atualizado.");
        openAccountSettings("Nome atualizado.");
        return;
      }

      const newPassword = String(data.get("newPassword") || "");
      const confirmPassword = String(data.get("confirmPassword") || "");
      if (newPassword.length < 8) throw new Error("A nova senha precisa ter pelo menos 8 caracteres.");
      if (newPassword !== confirmPassword) throw new Error("As novas senhas não são iguais.");
      if (!user.email || !currentPassword) throw new Error("Digite a senha atual da conta para confirmar a alteração.");

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast("Senha atualizada.");
      openAccountSettings("Senha atualizada.");
    } catch (error) {
      openAccountSettings(error.code ? errorMessage(error) : error.message, true);
    }
  });
}
