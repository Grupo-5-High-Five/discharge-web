var fkEmpresa = sessionStorage.ID_EMPRESA;

function cadastrarMetrica() {
    let energiaMaxima = 14.330
    let co2Maximo = 6.31

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