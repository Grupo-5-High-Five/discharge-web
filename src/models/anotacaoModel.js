var database = require("../database/config");

function listar(fkfuncionario, fkempresa) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucaoSql = `
        SELECT a.id, a.texto, a.fkfuncionario, f.nome, a.fkempresa 
          FROM anotacoes a
          INNER JOIN funcionario f
          ON a.fkfuncionario = f.id
        WHERE a.fkfuncionario = ? OR a.fkempresa = ?;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [fkfuncionario, fkempresa]);
}

function publicar(texto, fkfuncionario, fkempresa) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()"
  );
  var instrucaoSql = `
        INSERT INTO anotacoes (texto, fkfuncionario, fkempresa) VALUES
        (?, ?, ${fkempresa});
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [texto, fkfuncionario]);
}

function editar(texto, fkempresa, id) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarAnotacaoEmpresa() "
  );
  var instrucaoSql = `
      UPDATE anotacoes 
      SET texto = "${texto}",
      WHERE id = ${id} and fkempresa = ${fkempresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletar(ListId) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarAnotacaoUsuario()"
  );
  var instrucaoSql = `
        DELETE FROM anotacoes WHERE id IN (?);
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [ListId]);
}

module.exports = {
  listar,
  publicar,
  editar,
  deletar,
};
