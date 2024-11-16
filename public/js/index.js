sessionStorage.setItem("ID_USUARIO", "1");
sessionStorage.setItem("NOME_USUARIO", "Jorge");

document.addEventListener("DOMContentLoaded", function () {
  const id_user = sessionStorage.getItem("ID_USUARIO");
  const nome_user = sessionStorage.getItem("NOME_USUARIO");

  const btn_entrar = document.querySelector(".notlogin");
  const btn_user = document.querySelector(".uplogin");
  const link_user = document.querySelector("#a_user");

  const a_btn_entrar = document.querySelector("#a_entrar_desktop");
  const txt_btn_entrar = document.querySelector("#txt_entrar_desktop");

  if (id_user && nome_user) {
    const userImg = document.createElement("img");
    const userName = document.createTextNode(` ${nome_user}`);
    userImg.src = "./assets/imgs/user.svg";
    userImg.alt = "Imagem de usuário";

    // Mobile
    btn_entrar.classList.add("down");
    btn_user.classList.add("up");

    link_user.innerHTML = "";
    link_user.appendChild(userImg);
    link_user.appendChild(userName);

    // Desktop
    a_btn_entrar.innerHTML = "";
    a_btn_entrar.appendChild(userImg);
    txt_btn_entrar.appendChild(document.createTextNode(userName));
  } else {
    btn_entrar.classList.remove("down");
    btn_user.classList.remove("up");

    txt_btn_entrar.textContent = "Entrar";
  }
});
