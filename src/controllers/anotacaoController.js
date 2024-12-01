var anotacaoModel = require("../models/anotacaoModel");

function listar(req, res) {
  var fkUser = req.params.id;
  var fkEmp = req.params.fkempresa;
  console.log(fkUser, fkEmp);

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
  console.log(fkfuncionario, fkempresa, texto);

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
  var titulo = req.body.titulo;
  var texto = req.body.texto;
  var id = req.params.id;

  if (titulo == undefined) {
    res.status(400).send("O título está indefinido!");
  } else if (texto == undefined) {
    res.status(400).send("A texto está indefinido!");
  } else if (id == undefined) {
    res.status(403).send("O id do funcionário está indefinido!");
  } else {
    anotacaoModel
      .editarAnotacaoUsuario(titulo, texto, id)
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
