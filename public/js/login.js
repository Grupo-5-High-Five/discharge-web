function visualizarSenha() {
  var image = document.getElementById("imagemSenha");
  var input = document.getElementById("input_senha");

  if (image.src === "https://www.svgrepo.com/show/380007/eye-password-hide.svg") {
    image.src = "https://www.svgrepo.com/show/380010/eye-password-show.svg";
    input.type = "text";
  } else if ((image.src = "https://www.svgrepo.com/show/380010/eye-password-show.svg")) {
    image.src = "https://www.svgrepo.com/show/380007/eye-password-hide.svg";
    input.type = "password";
  }
}

function visualizarSenhaModal() {
  var image = document.getElementById("imagemSenhaModal");
  var input = document.getElementById("input_nova_senha_modal");

  if (image.src === "https://www.svgrepo.com/show/380007/eye-password-hide.svg") {
    image.src = "https://www.svgrepo.com/show/380010/eye-password-show.svg";
    input.type = "text";
  } else if ((image.src = "https://www.svgrepo.com/show/380010/eye-password-show.svg")) {
    image.src = "https://www.svgrepo.com/show/380007/eye-password-hide.svg";
    input.type = "password";
  }
}

function visualizarConfirmarSenhaModal() {
  var image = document.getElementById("imagemConfirmarSenhaModal");
  var input = document.getElementById("input_confirmar_nova_senha_modal");

  if (image.src === "https://www.svgrepo.com/show/380007/eye-password-hide.svg") {
    image.src = "https://www.svgrepo.com/show/380010/eye-password-show.svg";
    input.type = "text";
  } else if ((image.src = "https://www.svgrepo.com/show/380010/eye-password-show.svg")) {
    image.src = "https://www.svgrepo.com/show/380007/eye-password-hide.svg";
    input.type = "password";
  }
}

function entrar() {
  event.preventDefault();

  let emailVar = input_email.value;
  let senhaVar = input_senha.value;

  if (emailVar == "" || senhaVar == "") {
    let titulo = "Todos os campos devem ser preenchidos!";
    let msg = "";
    let icon = "warning";
    let action = false;

    modal(titulo, msg, icon, action);
  } else {
    fetch("/usuario/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailServer: emailVar,
        senhaServer: senhaVar,
      }),
    })
      .then(function (resposta) {
        if (resposta.ok) {
          let titulo = "Login realizado com sucesso!";
          let msg = "Aguarde que estamos te redirecionando para página..";
          let icon = "success";
          let action = true;

          modal(titulo, msg, icon, action);

          resposta.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));
            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.ID_USUARIO = json.id;
            sessionStorage.CARGO_USUARIO = json.cargo;
          });
        } else {
          let titulo = "Credênciais Inválidas!";
          let msg = "Verifique suas credências ou entre em contato com nosso suporte.";
          let icon = "error";
          let action = false;

          modal(titulo, msg, icon, action);

          resposta.text().then((texto) => {
            console.error(texto);
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });

    return false;
  }
}

function enviarEmail() {
  event.preventDefault(); // Previne o comportamento padrão do envio do formulário

  const email = input_email_modal.value;

  fetch("usuario/emailEnviar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        // Verifica se a resposta não foi bem-sucedida
        throw new Error("Erro ao enviar e-mail");
      }
      return response.json(); // Retorna o corpo da resposta como JSON
    })
    .then((data) => {
      if (data.success) {
        alert("E-mail de recuperação enviado!");
        $("#modal_email").modal("hide");
        $("#modal_senha").modal("show");
      } else {
        alert("Erro ao enviar e-mail.");
      }
    })
    .catch((error) => {
      console.log(error.message);
      alert("Erro: " + error.message);
    });
}

function atualizarSenha() {
  event.preventDefault();

  const novaSenha = input_nova_senha_modal.value;
  const confirmacaoNovaSenha = input_confirmar_nova_senha_modal.value;
  const tokenRecuperacao = input_token.value;

  if (novaSenha != confirmacaoNovaSenha) {
    alert("As senhas estão diferentes");
  } else {
    fetch("usuario/atualizarSenha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenRecuperacao: tokenRecuperacao,
        novaSenha: novaSenha,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // Verifica se a resposta não foi bem-sucedida
          throw new Error("Erro ao alterar a senha");
        }
        return response.json(); // Retorna o corpo da resposta como JSON
      })
      .then((data) => {
        if (data.success) {
          alert("Senha alterada com sucesso!");
          $("#modal_senha").modal("hide");
        } else {
          alert("Erro ao alterar a senha.");
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert("Erro: " + error.message);
      });
  }
}

function modal(titulo, msg, tipo, action) {
  let tempo = 3500;
  if (action) {
    tempo = 1760;
  }

  let timerInterval;
  Swal.fire({
    title: titulo, // Parâmetro do título
    html: msg, // Parâmetro da msg
    icon: tipo, // Parâmetro do tipo
    position: "top",
    timer: tempo,
    timerProgressBar: true,
    showClass: {
      popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
    },
    hideClass: {
      popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
    },
    didOpen: () => {
      Swal.showLoading();

      let timerBar = document.querySelector(".swal2-timer-progress-bar");

      if (timerBar) {
        let corBarra = "#80f73b";

        if (tipo == "error") {
          corBarra = "#FF5733";
        } else if (tipo == "warning") {
          corBarra = "#f2ae2e";
        }

        timerBar.style.backgroundColor = corBarra;
      }

      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (action && result.dismiss === Swal.DismissReason.timer) {
      window.location.href = "../dashboard/home.html";
    }
  });
}
