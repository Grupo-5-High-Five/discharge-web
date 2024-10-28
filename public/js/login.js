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
    alert("Todos os campos devem ser preenchidos");
  } else {
    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

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
        console.log("ESTOU NO THEN DO entrar()!");

        if (resposta.ok) {
          console.log(resposta);

          resposta.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));
            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.ID_USUARIO = json.id;

            window.location = "../dashboard/home.html";

          });
        } else {
          console.log("Houve um erro ao tentar realizar o login!");

          resposta.text().then((texto) => {
            console.error(texto);
            // finalizarAguardar(texto);
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email
    })
  })
    .then(response => {
      if (!response.ok) { // Verifica se a resposta não foi bem-sucedida
        throw new Error("Erro ao enviar e-mail");
      }
      return response.json(); // Retorna o corpo da resposta como JSON
    })
    .then(data => {
      if (data.success) {
        alert("E-mail de recuperação enviado!");
        $("#modal_email").modal("hide");
        $("#modal_senha").modal("show");
      } else {
        alert("Erro ao enviar e-mail.");
      }
    })
    .catch(error => {
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
    alert("As senhas estão diferentes")
  } else {

    fetch("usuario/atualizarSenha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tokenRecuperacao: tokenRecuperacao,
        novaSenha: novaSenha
      })
    })
      .then(response => {
        if (!response.ok) { // Verifica se a resposta não foi bem-sucedida
          throw new Error("Erro ao alterar a senha");
        }
        return response.json(); // Retorna o corpo da resposta como JSON
      })
      .then(data => {
        if (data.success) {
          alert("Senha alterada com sucesso!");
          $("#modal_senha").modal("hide");
        } else {
          alert("Erro ao alterar a senha.");
        }
      })
      .catch(error => {
        console.log(error.message);
        alert("Erro: " + error.message);
      });
  }
}