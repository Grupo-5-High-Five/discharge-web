var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarVisaoEnergetica/:fkEmpresa", function (req, res) {
  dashboardController.listarVisaoEnergetica(req, res);
});

router.get("/listarGraphTendencia/:fkEmpresa", function (req, res) {
  dashboardController.listarGraphTendencia(req, res);
});

router.get("/listarGraphAtrasado/:fkEmpresa", function (req, res) {
  dashboardController.listarGraphAtrasado(req, res);
});

router.get("/listarGraphAdiantado/:fkEmpresa", function (req, res) {
  dashboardController.listarGraphAdiantado(req, res);
});

router.get("/listarGraphConsumo/:fkEmpresa", function (req, res) {
  dashboardController.listarGraphConsumo(req, res);
});

router.get("/listarQualidade/:fkEmpresa", function (req, res) {
  dashboardController.listarQualidade(req, res);
});

module.exports = router;
