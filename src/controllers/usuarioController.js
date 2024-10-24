var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var tipo = req.body.tipoServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.params.fkEmpresa;


    // Faça as validações dos valores
    if (nome == undefined) {
        console.log(nome)
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("Seu tipo está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua matriz está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, cpf, tipo, senha, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listar(req, res) {
    var fkEmpresa = req.params.fkEmpresa
    usuarioModel.listar(fkEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function desativarFuncionario(req, res) {
    var idFuncionarioDesativar = req.body.idFuncionarioDesativar;

    usuarioModel.desativarFuncionario(idFuncionarioDesativar)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function mudarCargo(req, res) {
    var idFuncionarioDesativar = req.body.idFuncionarioDesativar;
    var cargo = req.body.cargo

    usuarioModel.mudarCargo(idFuncionarioDesativar, cargo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}


function emailEnviar(req, res) {
    var email = req.body.email; // E-mail enviado pelo cliente

    if (email == undefined) {
        res.status(400).send("O e-mail está indefinido!");
    } else {
        // Primeiro, validar se o e-mail existe no banco
        usuarioModel.validarEmail(email)
            .then(function(resultadoValidacao) {
                if (resultadoValidacao.length > 0) {
                    // Se o e-mail for encontrado, enviar o e-mail
                    usuarioModel.emailEnviar(email)
                        .then(function(resultadoEnvio) {
                            res.status(200).send("E-mail enviado com sucesso!");
                        })
                        .catch(function(erroEnvio) {
                            console.log(erroEnvio);
                            res.status(500).json("Erro ao enviar o e-mail: " + erroEnvio);
                        });
                } else {
                    // Se o e-mail não for encontrado no banco de dados
                    res.status(404).send("E-mail não cadastrado!");
                }
            })
            .catch(function(erroValidacao) {
                console.log(erroValidacao);
                res.status(500).json("Erro ao verificar o e-mail: " + erroValidacao);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar,
    listar,
    desativarFuncionario,
    mudarCargo,
    emailEnviar
}