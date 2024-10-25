var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar/:fkEmpresa", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/emailEnviar", function (req, res) {
    usuarioController.emailEnviar(req, res);
})

router.post("/atualizarSenha", function (req, res) {
    usuarioController.atualizarSenha(req, res);
})

router.get("/listarFuncionarios/:fkEmpresa", function (req, res) {
    usuarioController.listar(req, res);
})

router.put("/desativarFuncionario/:idFuncionarioDesativar", function (req, res) {
    usuarioController.desativarFuncionario(req, res);
})

router.put("/mudarCargo/:idFuncionarioDesativar", function (req, res) {
    usuarioController.mudarCargo(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;