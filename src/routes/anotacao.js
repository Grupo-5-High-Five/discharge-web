var express = require("express");
var router = express.Router();

var anotacaoController = require("../controllers/anotacaoController");

router.get("/listar", function (req, res) {
  anotacaoController.listar(req, res);
});

router.post("/publicar/:fkempresa", function (req, res) {
  anotacaoController.publicar(req, res);
});

router.put("/editar/:id", function (req, res) {
  anotacaoController.editarAnotacaoUsuario(req, res);
});

router.put("/editar/:id/:fkempresa", function (req, res) {
  anotacaoController.editarAnotacaoEmpresa(req, res);
});

router.delete("/deletar/:id", function (req, res) {
  anotacaoController.deletarAnotacaoUsuario(req, res);
});

router.delete("/deletar/:id/:fkempresa", function (req, res) {
  anotacaoController.deletarAnotacaoEmpresa(req, res);
});

module.exports = router;
