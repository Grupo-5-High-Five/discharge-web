// Nome usuário

const id = document.getElementById("name_user");
const user = sessionStorage.getItem("NOME_USUARIO");
const cargo = sessionStorage.getItem("CARGO_USUARIO");

if (id && user) {
  id.textContent = user;
}

const func = document.getElementById("func");

if (cargo != "admin") {
  func.style.display = "none";
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
