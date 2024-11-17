document.addEventListener("DOMContentLoaded", function () {
  const id_user = sessionStorage.getItem("ID_USUARIO");
  const nome_user = sessionStorage.getItem("NOME_USUARIO");

  // Mobile
  const btn_entrar = document.querySelector(".notlogin");
  const btn_user = document.querySelector(".uplogin");
  const link_user = document.querySelector("#a_user");

  // Desktop
  const a_btn_entrar = document.querySelector("#a_entrar_desktop");
  const txt_btn_entrar = document.querySelector("#txt_entrar_desktop");

  if (id_user && nome_user) {
    const userImg = document.createElement("img");
    userImg.src = "./assets/imgs/user.svg";
    userImg.alt = "Imagem de usuário";

    // Mobile
    if (btn_entrar && btn_user && link_user) {
      btn_entrar.classList.add("down");
      btn_user.classList.add("up");

      link_user.innerHTML = "";
      link_user.appendChild(userImg.cloneNode());
      link_user.appendChild(document.createTextNode(nome_user));
    }

    // Desktop
    if (a_btn_entrar && txt_btn_entrar) {
      a_btn_entrar.href = "./dashboard/home.html";

      txt_btn_entrar.innerHTML = "";
      txt_btn_entrar.appendChild(userImg.cloneNode());
      txt_btn_entrar.appendChild(document.createTextNode(nome_user));
    }
  } else {
    // Mobile
    if (btn_entrar && btn_user) {
      btn_entrar.classList.remove("down");
      btn_user.classList.remove("up");
    }

    // Desktop
    if (txt_btn_entrar && a_btn_entrar) {
      txt_btn_entrar.textContent = "Entrar"; // Texto padrão
      a_btn_entrar.href = "./login.html";
    }
  }
});
