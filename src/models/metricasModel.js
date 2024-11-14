var database = require("../database/config");

function cadastrar(consumo_maximo, desperdicio_maximo, co2_maximo, potencia_reativa_atrasada_maxima, potencia_reativa_adiantada_maxima, fkempresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql = `
        INSERT INTO metrica (consumo_maximo, desperdicio_maximo, co2_maximo, potencia_reativa_atrasada_maxima, potencia_reativa_adiantada_maxima, fkempresa) VALUES ('${consumo_maximo}', '${desperdicio_maximo}', '${co2_maximo}', '${potencia_reativa_atrasada_maxima}', '${potencia_reativa_adiantada_maxima}', ${fkempresa});`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listar(fkempresa) {
  var instrucaoSql = `SELECT * FROM metrica where fkempresa = ${fkempresa}`;
  return database.executar(instrucaoSql);
}

function editarMetrica(consumo_maximo, desperdicio_maximo, co2_maximo, potencia_reativa_atrasada_maxima, potencia_reativa_adiantada_maxima, fkempresa) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",
    fkempresa
  );
  var instrucaoSql = `
    UPDATE metrica
    SET consumo_maximo = "${consumo_maximo}",
    desperdicio_maximo = "${desperdicio_maximo}",
    co2_maximo = "${co2_maximo}",
    potencia_reativa_atrasada_maxima = "${potencia_reativa_atrasada_maxima}",
    potencia_reativa_adiantada_maxima = "${potencia_reativa_adiantada_maxima}"
    WHERE fkempresa = ${fkempresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletar(fkempresa) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():",
    fkempresa
  );
  var instrucaoSql = `
        DELETE FROM metrica WHERE fkempresa = ${fkempresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
  listar,
  editarMetrica,
  deletar,
};
