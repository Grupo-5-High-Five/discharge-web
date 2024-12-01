var express = require("express");
var router = express.Router();

var anotacaoController = require("../controllers/anotacaoController");

router.get("/listar/:id/:fkempresa", function (req, res) {
  anotacaoController.listar(req, res);
});

router.post("/publicar/:id/:fkempresa", function (req, res) {
  anotacaoController.publicar(req, res);
});

router.put("/editar/:id", function (req, res) {
  anotacaoController.editar(req, res);
});

router.delete("/deletar/", function (req, res) {
  anotacaoController.deletar(req, res);
});

module.exports = router;
