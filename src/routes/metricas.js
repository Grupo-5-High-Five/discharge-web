var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/metricasController");

router.post("/cadastrar/:fkEmpresa", function (req, res) {
    medidaController.cadastrar(req, res);
})

module.exports = router;