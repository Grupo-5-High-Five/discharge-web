var anotacaoModel = require("../models/anotacaoModel");

function listar(req, res) {
  anotacaoModel
    .listar()
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
  var titulo = req.body.titulo;
  var texto = req.body.texto;
  var fkfuncionario = req.body.fkfuncionario;
  var fkempresa = req.params.fkempresa;

  if (titulo == undefined) {
    res.status(400).send("O título está indefinido!");
  } else if (texto == undefined) {
    res.status(400).send("A texto está indefinido!");
  } else if (fkfuncionario == undefined) {
    res.status(403).send("A fkfuncionario está indefinido!");
  } else if (fkempresa == undefined) {
    res.status(403).send("A fkempresa está indefinido!");
  } else {
    anotacaoModel
      .publicar(titulo, descricao, idUsuario)
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

function editarAnotacaoUsuario(req, res) {
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

function editarAnotacaoEmpresa(req, res) {
  var titulo = req.body.titulo;
  var texto = req.body.texto;
  var fkempresa = req.params.fkempresa;
  var id = req.params.id;

  if (titulo == undefined) {
    res.status(400).send("O título está indefinido!");
  } else if (texto == undefined) {
    res.status(400).send("A texto está indefinido!");
  } else if (fkempresa == undefined) {
    res.status(403).send("A fkempresa está indefinido!");
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

function deletarAnotacaoUsuario(req, res) {
  var id = req.params.idAviso;

  anotacaoModel
    .deletarAnotacaoUsuario(id)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function deletarAnotacaoEmpresa(req, res) {
  var fkempresa = req.params.fkempresa;
  var id = req.params.idAviso;

  anotacaoModel
    .deletarAnotacaoEmpresa(id, fkempresa)
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
  publicar,
  editarAnotacaoUsuario,
  editarAnotacaoEmpresa,
  deletarAnotacaoUsuario,
  deletarAnotacaoEmpresa,
};
