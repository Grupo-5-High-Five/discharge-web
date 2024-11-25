var database = require("../database/config");

function cadastrar(consumo, co2, reativa_atrasada, reativa_adiantada, fator_potencia_atrasado, fator_potencia_adiantado, fkempresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  const instrucaoSql = `
  INSERT INTO metrica (
    co2_maximo_anual,
    consumo_maximo_mensal,
    potencia_reativa_atrasada_maxima_semanal,
    potencia_reativa_adiantada_maxima_semanal,
    fator_potencia_atrasado_maxima_diario,
    fator_potencia_adiantado_maxima_diario,
    fkempresa
  ) VALUES (
    ${co2 === "default" ? "DEFAULT" : co2}, 
    ${consumo === "default" ? "DEFAULT" : consumo}, 
    ${reativa_atrasada === "default" ? "DEFAULT" : reativa_atrasada},
    ${reativa_adiantada === "default" ? "DEFAULT" : reativa_adiantada}, 
    ${fator_potencia_atrasado === "default" ? "DEFAULT" : fator_potencia_atrasado}, 
    ${fator_potencia_adiantado === "default" ? "DEFAULT" : fator_potencia_adiantado}, 
    ?
  );
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [fkempresa]);
}

function listar(fkempresa) {
  var instrucaoSql = `SELECT * FROM metrica where fkempresa = ?`;
  return database.executar(instrucaoSql, [fkempresa]);
}

function editarMetrica(consumo, co2, reativa_atrasada, reativa_adiantada, fator_potencia_atrasado, fator_potencia_adiantado, fkempresa) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",
    fkempresa
  );
  var instrucaoSql = `
  UPDATE metrica
  SET 
      co2_maximo_anual = ?, 
      consumo_maximo_mensal = ?, 
      potencia_reativa_atrasada_maxima_semanal = ?, 
      potencia_reativa_adiantada_maxima_semanal = ?, 
      fator_potencia_atrasado_maxima_diario = ?, 
      fator_potencia_adiantado_maxima_diario = ?
  WHERE fkempresa = ?;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [consumo, co2, reativa_atrasada, reativa_adiantada, fator_potencia_atrasado, fator_potencia_adiantado, fkempresa]);
}

function deletar(metrica, fkempresa) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():",
    fkempresa
  );
  var instrucaoSql = `
         UPDATE metrica
         SET 
              ? = default, 
         WHERE fkempresa = ?;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [metrica, fkempresa]);
}

module.exports = {
  cadastrar,
  listar,
  editarMetrica,
  deletar,
};
