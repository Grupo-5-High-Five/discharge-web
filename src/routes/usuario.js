var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar/:fkempresa", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

router.post("/emailEnviar", function (req, res) {
  usuarioController.emailEnviar(req, res);
});

router.post("/atualizarSenha", function (req, res) {
  usuarioController.atualizarSenha(req, res);
});

//  Funcionário

router.get("/listarFuncionarios/:fkempresa", function (req, res) {
  usuarioController.listar(req, res);
});

router.put("/desativarFuncionario/:id", function (req, res) {
  usuarioController.desativarFuncionario(req, res);
});

router.put("/atualizarFuncionario/:id", function (req, res) {
  usuarioController.atualizarFuncionario(req, res);
});

module.exports = router;
