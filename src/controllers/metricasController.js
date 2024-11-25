var metricasModel = require("../models/metricasModel");

function cadastrar(req, res) {
  var fkempresa = req.params.fkempresa;
  var co2 = req.body.co2;
  var consumo = req.body.consumo;
  var reativa_atrasada = req.body.reativa_atrasada;
  var reativa_adiantada = req.body.reativa_adiantada;
  var fator_potencia_atrasado = req.body.fator_potencia_atrasado;
  var fator_potencia_adiantado = req.body.fator_potencia_adiantado;

  if (co2 == undefined) {
    res.status(400).send("O CO2 máximo anual está undefined!");
  } else if (consumo == undefined) {
    res.status(400).send("O consumo máximo mensal está undefined!");
  } else if (reativa_atrasada == undefined) {
    res.status(400).send("A potência reativa atrasada máxima semanal está undefined!");
  } else if (reativa_adiantada == undefined) {
    res.status(400).send("A potência reativa adiantada máxima semanal está undefined!");
  } else if (fator_potencia_atrasado == undefined) {
    res.status(400).send("O fator de potência atrasado máximo diário está undefined!");
  } else if (fator_potencia_adiantado == undefined) {
    res.status(400).send("O fator de potência adiantado máximo diário está undefined!");
  } else if (fkempresa == undefined) {
    res.status(400).send("A empresa está undefined!");
  } else {
    metricasModel
      .cadastrar(consumo, co2, reativa_atrasada, reativa_adiantada, fator_potencia_atrasado, fator_potencia_adiantado, fkempresa)
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
  var fkempresa = req.params.fkempresa;
  var co2 = req.body.co2;
  var consumo = req.body.consumo;
  var reativa_atrasada = req.body.reativa_atrasada;
  var reativa_adiantada = req.body.reativa_adiantada;
  var fator_potencia_atrasado = req.body.fator_potencia_atrasado;
  var fator_potencia_adiantado = req.body.fator_potencia_adiantado;

  if (!co2) {
    return res.status(400).send("O CO2 máximo anual está indefinido ou vazio!");
  } else if (!consumo) {
    return res.status(400).send("O consumo máximo mensal está indefinido ou vazio!");
  } else if (!reativa_atrasada) {
    return res.status(400).send("A potência reativa atrasada máxima semanal está indefinida ou vazia!");
  } else if (!reativa_adiantada) {
    return res.status(400).send("A potência reativa adiantada máxima semanal está indefinida ou vazia!");
  } else if (!fator_potencia_atrasado) {
    return res.status(400).send("O fator de potência atrasado máximo diário está indefinido ou vazio!");
  } else if (!fator_potencia_adiantado) {
    return res.status(400).send("O fator de potência adiantado máximo diário está indefinido ou vazio!");
  } else if (!fkempresa) {
    return res.status(400).send("A empresa está indefinida ou vazia!");
  } else {
    metricasModel
      .editarMetrica(consumo, co2, reativa_atrasada, reativa_adiantada, fator_potencia_atrasado, fator_potencia_adiantado, fkempresa)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
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
