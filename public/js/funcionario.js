var fkEmpresa = sessionStorage.ID_EMPRESA;

function cadastrar() {

    var nomeVar = input_nome.value;
    var senhaVar = input_senha.value;
    var emailVar = input_email.value;
    var cpfVar = input_cpf.value;
    var tipoVar = select_funcionario.value;


    if (nomeVar != '' && senhaVar != '' && emailVar != '' &&
        cpfVar != '' && tipoVar != '') {
        alert("Cadastrando...")
    } else {
        return false;
    }

    if (nomeVar.length <= 3) {
        alert('Nome Inválido!')
    } else if (cpfVar.length != 12) {
        alert('CPF Inválido!')
    }
    else if (emailVar.indexOf('@') == -1) {
        alert('Email inválido!')
    }
    else if (senhaVar.length > 16) {
        alert('A Senha tem que ter menos que 16 caracteres');
    } else {
        fetch(`/usuario/cadastrar/${fkEmpresa}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeVar,
                emailServer: emailVar,
                cpfServer: cpfVar,
                tipoServer: tipoVar,
                senhaServer: senhaVar
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

}

let listaFuncionarios = []

function listarFuncionarios() {

    fetch(`/usuario/listarFuncionarios/${fkEmpresa}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((funcionarios) => {
                funcionarios.forEach((funcionario) => {
                    listaFuncionarios.push(funcionario);
                });
                listarUsuariosComCheckbox()
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}


// ----------------- OUTRA FORMA COM SELECT -----------------
// function plotarSelect() {
//     let select = document.getElementById("select_teste");

//     listaFuncionarios.forEach(funcionario => {
//         // Criar uma nova opção
//         let option = document.createElement("option");
//         option.value = funcionario.id; // Define o valor da option
//         option.text = funcionario.nome;  // Define o texto que será exibido

//         // Adiciona a option ao select
//         select.appendChild(option);
//     });
// }


function listarUsuariosComCheckbox() {
    let divListaUsuarios = document.getElementById("listaUsuarios");

    listaFuncionarios.forEach(funcionario => {
        // Criando o checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = funcionario.id;  // O valor do checkbox será o id do funcionário
        checkbox.id = "funcionario_" + funcionario.id;

        // Criando o label para o checkbox
        let label = document.createElement("label");
        label.htmlFor = checkbox.id;  // Associando o label ao checkbox
        label.innerText = funcionario.nome;  // O nome do funcionário aparecerá ao lado do checkbox

        // Adicionando o checkbox e o label na div
        divListaUsuarios.appendChild(checkbox);
        divListaUsuarios.appendChild(label);

        // Quebra de linha para separar cada usuário
        divListaUsuarios.appendChild(document.createElement("br"));
    });
}

function desativarUsuario() {

    let checkboxes = document.querySelectorAll("#listaUsuarios input[type='checkbox']:checked");
    let idFuncionarioDesativar = [];

    checkboxes.forEach(checkbox => {
        idFuncionarioDesativar.push(checkbox.value);  // Pegando o valor (id do funcionário) de cada checkbox selecionado
    });

    // -------------- DESFAZER COMENTARIO SE FOR USAR SELECT --------------
    // const idFuncionarioDesativar = select_teste.value;

    console.log(idFuncionarioDesativar)

    fetch(`/usuario/desativarFuncionario/${idFuncionarioDesativar}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idFuncionarioDesativar: idFuncionarioDesativar
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

function mudarCargo() {
    let cargo = "COLOCA A VARIAVEL"
    let idFuncionarioDesativar = "COLOCA A VARIAVEL"

    fetch(`/usuario/mudarCargo/${idFuncionarioDesativar}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idFuncionarioDesativar: idFuncionarioDesativar,
            cargo: cargo
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert("Mudei o cargo"); // Precisamos colocar alguma tela ou modal aqui
        } else if (resposta.status == 404) {
            window.alert("Deu 404! No cargo"); // Precisamos colocar alguma tela ou modal aqui
        } else {
            throw ("Houve um erro ao tentar mudar o cargo " + resposta.status); // Precisamos colocar alguma tela ou modal aqui
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}