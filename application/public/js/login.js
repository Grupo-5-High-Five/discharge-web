function visualizarSenha() {
    var image = document.getElementById("imagemSenha");
    var input = document.getElementById("input_senha");

    if (
        image.src === "https://www.svgrepo.com/show/380007/eye-password-hide.svg"
    ) {
        image.src = "https://www.svgrepo.com/show/380010/eye-password-show.svg";
        input.type = "text";
    } else if (
        (image.src = "https://www.svgrepo.com/show/380010/eye-password-show.svg")
    ) {
        image.src = "https://www.svgrepo.com/show/380007/eye-password-hide.svg";
        input.type = "password";
    }
}

function entrar() {

    event.preventDefault()

    let emailVar = input_email.value;
    let senhaVar = input_senha.value;

    if (emailVar == "" || senhaVar == "") {
        alert("Todos os campos devem ser preenchidos")
    }
    else {

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")


            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;

                    setTimeout(function () {
                        window.location = "./dashboard/dashboard.html";
                    }, 1000); // apenas para exibir o loading

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    // finalizarAguardar(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }
}