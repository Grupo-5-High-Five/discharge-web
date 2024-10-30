// Nome usuário

const id = document.getElementById("name_user");
const user = sessionStorage.getItem("NOME_USUARIO");

if (id && user) {
  id.textContent = user;
}

// Abrir & Fechar menu

function menu() {
  const nav = document.getElementById("nav");
  nav.classList.toggle("aberto");
}

function sair() {
  sessionStorage.clear();
  window.location.href = "../login.html";
}
