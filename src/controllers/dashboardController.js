var dashboardModel = require("../models/dashboardModel");

function listarSuperiores(req, res) {
    var fkempresa = req.params.fkEmpresa;
  
    dashboardModel.listar(fkempresa)
      .then((resultado) => {
        res.status(200).json(resultado); // Retorna os dados no formato esperado
      })
      .catch((err) => {
        console.error("Erro ao listar superiores:", err);
        res.status(500).json({ error: "Erro ao buscar KPIs." }); // Tratamento de erro
      });
  }

module.exports = {
  listarSuperiores
};
