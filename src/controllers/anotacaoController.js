var anotacaoModel = require("../models/anotacaoModel");

function listar(req, res) {
  var fkUser = req.params.id;
  var fkEmp = req.params.fkempresa;

  anotacaoModel
    .listar(fkUser, fkEmp)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function publicar(req, res) {
  var fkfuncionario = req.params.id;
  var fkempresa = req.params.fkempresa;
  var texto = req.body.textServer;

  if (texto == undefined) {
    res.status(400).send("A texto está indefinido!");
  } else if (fkfuncionario == undefined) {
    res.status(403).send("A fkfuncionario está indefinido!");
  } else if (fkempresa == undefined) {
    res.status(403).send("A fkempresa está indefinido!");
  } else {
    anotacaoModel
      .publicar(texto, fkfuncionario, fkempresa)
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

function editar(req, res) {
  var id = req.params.id;
  var texto = req.body.text;

  if (texto == undefined) {
    res.status(400).send("A texto está indefinido!");
  } else if (id == undefined) {
    res.status(403).send("O id do funcionário está indefinido!");
  } else {
    anotacaoModel
      .editar(id, texto)
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
  var arrayList = req.body.deletarIdsServer;

  anotacaoModel
    .deletar(arrayList)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listar,
  publicar,
  editar,
  deletar,
};
