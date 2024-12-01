var metricasModel = require("../models/metricasModel");

function listar(req, res) {
  var fkempresa = req.params.fkempresa;
  metricasModel.listar(fkempresa).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function editarMetrica(req, res) {
  var fkempresa = req.params.fkempresa;
  var column = req.params.column;
  var value = req.params.value;

  console.log(value)
  console.log(column)

  if (!column) {
    return res.status(400).send("A Coluna esté indefinida ou vazia!");
  } else if (!value) {
    return res.status(400).send("O valor está indefinido ou vazio!");
  }
  else {
    metricasModel
      .editarMetrica(column, value, fkempresa)
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
  var coluna = req.params.value;

  metricasModel
    .deletar(coluna, fkempresa)
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
  listar,
  editarMetrica,
  deletar,
};
