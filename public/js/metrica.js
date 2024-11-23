// var fkEmpresa = sessionStorage.ID_EMPRESA;
var fkEmpresa = 1;

function cadastrarMetrica() {
    let energiaMaxima = document.getElementById("input_energiaMax");
    let co2Maximo = document.getElementById("input_co2Max");

    fetch(`/metricas/cadastrar/${fkEmpresa}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            energiaMaxima: energiaMaxima,
            co2Maximo: co2Maximo
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                alert("Cadastro realizado com sucesso!")

                setTimeout(() => {
                    window.location = "cadastroFunc.html";
                }, "2000");
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

let listaMetricas = []

function mostrarMetricas() {
    fetch(`/metricas/listarMetricas/${fkEmpresa}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((metricas) => {
                metricas.forEach((metrica) => {
                    listaMetricas.push(metrica);
                });
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function editarMetrica() {

    let energiaMaxima = "12.000"
    let co2Maximo = "9.00"


    fetch(`/metricas/editarMetrica/${fkEmpresa}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            energiaMaxima: energiaMaxima,
            co2Maximo: co2Maximo
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert("Funciona"); // Precisamos colocar alguma tela ou modal aqui
        } else if (resposta.status == 404) {
            window.alert("Deu 404!"); // Precisamos colocar alguma tela ou modal aqui
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status); // Precisamos colocar alguma tela ou modal aqui
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function deletarMetrica() {
    fetch(`/metricas/deletar/${fkEmpresa}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert("Post deletado com sucesso pelo usuario de email: " + sessionStorage.getItem("EMAIL_USUARIO") + "!");
            window.location = "/dashboard/mural.html"
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

