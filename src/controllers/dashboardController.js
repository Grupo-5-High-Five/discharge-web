var dashboardModel = require("../models/dashboardModel");

function listarVisaoEnergetica(req, res) {
  var fkempresa = req.params.fkEmpresa;

  dashboardModel
    .listarVisaoEnergetica(fkempresa)
    .then((resultado) => {
      res.status(200).json(resultado); // Retorna os dados no formato esperado
    })
    .catch((err) => {
      console.error("Erro ao listar superiores:", err);
      res.status(500).json({ error: "Erro ao buscar KPIs." }); // Tratamento de erro
    });
}

function listarGraphTendencia(req, res) {
  var fkempresa = req.params.fkEmpresa;

  dashboardModel
    .listarGraphTendencia(fkempresa)
    .then((resultado) => {
      res.status(200).json(resultado); // Retorna os dados no formato esperado
    })
    .catch((err) => {
      console.error("Erro ao listar superiores:", err);
      res.status(500).json({ error: "Erro ao buscar KPIs." }); // Tratamento de erro
    });
}

function listarGraphAtrasado(req, res) {
  var fkempresa = req.params.fkEmpresa;

  dashboardModel
    .listarGraphAtrasado(fkempresa)
    .then((resultado) => {
      res.status(200).json(resultado); // Retorna os dados no formato esperado
    })
    .catch((err) => {
      console.error("Erro ao listar superiores:", err);
      res.status(500).json({ error: "Erro ao buscar KPIs." }); // Tratamento de erro
    });
}

function listarGraphAdiantado(req, res) {
  var fkempresa = req.params.fkEmpresa;

  dashboardModel
    .listarGraphAdiantado(fkempresa)
    .then((resultado) => {
      res.status(200).json(resultado); // Retorna os dados no formato esperado
    })
    .catch((err) => {
      console.error("Erro ao listar superiores:", err);
      res.status(500).json({ error: "Erro ao buscar KPIs." }); // Tratamento de erro
    });
}

function listarGraphConsumo(req, res) {
  var fkempresa = req.params.fkEmpresa;

  dashboardModel
    .listarGraphConsumo(fkempresa)
    .then((resultado) => {
      res.status(200).json(resultado); // Retorna os dados no formato esperado
    })
    .catch((err) => {
      console.error("Erro ao listar superiores:", err);
      res.status(500).json({ error: "Erro ao buscar KPIs." }); // Tratamento de erro
    });
}

function listarQualidade(req, res) {
  var fkempresa = req.params.fkEmpresa;

  dashboardModel
    .listarQualidade(fkempresa)
    .then((resultado) => {
      res.status(200).json(resultado); // Retorna os dados no formato esperado
    })
    .catch((err) => {
      console.error("Erro ao listar superiores:", err);
      res.status(500).json({ error: "Erro ao buscar KPIs." }); // Tratamento de erro
    });
}

module.exports = {
  listarVisaoEnergetica,
  listarGraphTendencia,
  listarGraphAtrasado,
  listarGraphAdiantado,
  listarGraphConsumo,
  listarQualidade,
};
