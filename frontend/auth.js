import { firebaseConfig, roleRoutes, defaultRoute } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const configReady = !Object.values(firebaseConfig).some(value =>
  String(value).startsWith("COLE_AQUI")
);

let auth = null;
let provider = null;

function getCurrentPage() {
  return window.location.pathname.split("/").pop() || "index.html";
}

function getRouteForUser(user) {
  const email = user.email.toLowerCase();
  return roleRoutes[email] || defaultRoute;
}

function showLoginMessage(message) {
  const element = document.getElementById("loginMessage");
  if (element) element.textContent = message;
}

function setupFirebase() {
  if (!configReady) return false;

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return true;
}

function protectPage() {
  if (!document.body.dataset.protected) return;

  if (!auth) {
    const next = encodeURIComponent(getCurrentPage());
    window.location.replace(`login.html?next=${next}`);
    return;
  }

  onAuthStateChanged(auth, user => {
    if (!user) {
      const next = encodeURIComponent(getCurrentPage());
      window.location.replace(`login.html?next=${next}`);
    } else {
      setupCurrentUser(user);
    }
  });
}

function setupCurrentUser(user) {
  if (!user) return;

  document.querySelectorAll("[data-current-user]").forEach(element => {
    element.textContent = user.displayName || user.email;
  });
}

function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn || !auth) return;

  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}

function setupLogin() {
  const googleLoginBtn = document.getElementById("googleLoginBtn");
  if (!googleLoginBtn) return;

  if (!configReady) {
    googleLoginBtn.disabled = true;
    showLoginMessage("Configure o Firebase em firebase-config.js para ativar o login com Gmail.");
    return;
  }

  onAuthStateChanged(auth, user => {
    if (!user) return;

    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    window.location.href = next || getRouteForUser(user);
  });

  googleLoginBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next");
      window.location.href = next || getRouteForUser(result.user);
    } catch (error) {
      showLoginMessage("Não foi possível entrar com Gmail. Tente novamente.");
      console.error(error);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupFirebase();
  setupLogin();
  setupLogout();
  protectPage();
});
