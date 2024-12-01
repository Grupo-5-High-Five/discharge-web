var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarMetricas/:fkEmpresa", function (req, res) {
    dashboardController.listarSuperiores(req, res);
});

module.exports = router;
