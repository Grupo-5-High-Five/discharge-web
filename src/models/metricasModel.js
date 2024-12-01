var database = require("../database/config");

function listar(fkempresa) {
  var instrucaoSql = `SELECT * FROM metrica where fkempresa = ?`;
  return database.executar(instrucaoSql, [fkempresa]);
}

function editarMetrica(column, value, fkempresa) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",
    fkempresa
  );
  var instrucaoSql = `
  UPDATE metrica
  SET 
      ${column} = ${value}
  WHERE fkempresa = ${fkempresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletar(coluna, fkempresa) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():",
    fkempresa
  );
  var instrucaoSql = ` 
        UPDATE metrica
         SET 
              ${coluna} = 0
         WHERE fkempresa = ${fkempresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  editarMetrica,
  deletar,
};
