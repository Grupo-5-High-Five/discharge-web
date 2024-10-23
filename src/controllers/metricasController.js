var metricasModel = require("../models/metricasModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var energiaMaxima = req.body.energiaMaxima
    var co2Maximo = req.body.co2Maximo
    var fkEmpresa = req.params.fkEmpresa;


    // Faça as validações dos valores
    if (energiaMaxima == undefined) {
        res.status(400).send("A energia máxima está undefined!");
    } else if (co2Maximo == undefined) {
        res.status(400).send("O CO2 máximo está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        metricasModel.cadastrar(energiaMaxima, co2Maximo, fkEmpresa)
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
    metricasModel.listar(fkEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function editarMetrica(req, res) {
    var energiaMaxima = req.body.energiaMaxima;
    var co2Maximo = req.body.co2Maximo;
    var fkEmpresa = req.params.fkEmpresa


    metricasModel.editarMetrica(energiaMaxima, co2Maximo, fkEmpresa)
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

function deletar(req, res) {
    var fkEmpresa = req.params.fkEmpresa

    metricasModel.deletar(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    listar,
    editarMetrica,
    deletar
}