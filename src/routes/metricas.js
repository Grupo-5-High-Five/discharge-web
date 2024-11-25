var express = require("express");
var router = express.Router();

var metricasController = require("../controllers/metricasController");

router.post("/cadastrar/:fkempresa", function (req, res) {
  metricasController.cadastrar(req, res);
});

router.get("/listarMetricas/:fkempresa", function (req, res) {
  metricasController.listar(req, res);
});

router.put("/editarMetrica/:fkempresa", function (req, res) {
  metricasController.editarMetrica(req, res);
});

router.put("/deletar/:fkempresa", function (req, res) {
  metricasController.deletar(req, res);
});

module.exports = router;
