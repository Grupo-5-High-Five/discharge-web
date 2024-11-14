var metricasModel = require("../models/metricasModel");

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var consumo_maximo = req.body.consumo_maximo;
  var desperdicio_maximo = req.body.desperdicio_maximo;
  var co2_maximo = req.body.co2_maximo;
  var potencia_reativa_atrasada_maxima = req.body.potencia_reativa_atrasada_maxima;
  var potencia_reativa_adiantada_maxima = req.body.potencia_reativa_adiantada_maxima;
  var fkempresa = req.params.fkempresa;

  // Faça as validações dos valores
  if (consumo_maximo == undefined) {
    res.status(400).send("O consumo máximo está undefined!");
  } else if (desperdicio_maximo == undefined) {
    res.status(400).send("O desperdicio máximo está undefined!");
  } else if (co2_maximo == undefined) {
    res.status(400).send("O CO2 máximo está undefined!");
  } else if (potencia_reativa_atrasada_maxima == undefined) {
    res.status(400).send("A potencia reativa atrasada está undefined!");
  } else if (potencia_reativa_adiantada_maxima == undefined) {
    res.status(400).send("O potencia adiantada atrasada máximo está undefined!");
  } else if (fkempresa == undefined) {
    res.status(400).send("Sua empresa está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    metricasModel
      .cadastrar(energiaMaxima, co2Maximo, fkempresa)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listar(req, res) {
  var fkempresa = req.params.fkempresa;
  metricasModel.listar(fkempresa).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function editarMetrica(req, res) {
  var consumo_maximo = req.body.consumo_maximo;
  var desperdicio_maximo = req.body.desperdicio_maximo;
  var co2_maximo = req.body.co2_maximo;
  var potencia_reativa_atrasada_maxima = req.body.potencia_reativa_atrasada_maxima;
  var potencia_reativa_adiantada_maxima = req.body.potencia_reativa_adiantada_maxima;
  var fkempresa = req.params.fkempresa;

  metricasModel
    .editarMetrica(consumo_maximo, desperdicio_maximo, co2_maximo, potencia_reativa_atrasada_maxima, potencia_reativa_adiantada_maxima, fkempresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function deletar(req, res) {
  var fkempresa = req.params.fkempresa;

  metricasModel
    .deletar(fkempresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrar,
  listar,
  editarMetrica,
  deletar,
};
