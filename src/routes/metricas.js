var express = require("express");
var router = express.Router();

var metricasController = require("../controllers/metricasController");

router.post("/cadastrar/:fkEmpresa", function (req, res) {
    metricasController.cadastrar(req, res);
})

router.get("/listarMetricas/:fkEmpresa", function (req, res) {
    metricasController.listar(req, res);
})

router.put("/editarMetrica/:fkEmpresa", function (req, res) {
    metricasController.editarMetrica(req, res);
})

router.delete("/deletar/:fkEmpresa", function (req, res) {
    metricasController.deletar(req, res);
});

module.exports = router;