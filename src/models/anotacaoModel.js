var database = require("../database/config");

function listar(fkfuncionario, fkempresa) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucaoSql = `
        SELECT a.id a.titulo, a.texto, f.nome, f.fkempresa
        FROM anotacoes a
            INNER JOIN funcionario f
                ON a.fkfuncionario = f.id
        WHERE = fkfuncionario = ${fkfuncionario} and fkempresa = ${fkempresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function publicar(titulo, texto, fkfuncionario, fkempresa) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()"
  );
  var instrucaoSql = `
        INSERT INTO anotacoes (titulo, texto, fkfuncionario, fkempresa) VALUES
        ("${titulo}", "${texto}", ${fkfuncionario}, ${fkempresa});
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editarAnotacaoUsuario(titulo, texto, id) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarAnotacaoUsuario()"
  );
  var instrucaoSql = `
      UPDATE anotacoes 
      SET titulo = "${titulo}", 
      texto = "${texto}",
      WHERE id = ${id};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editarAnotacaoEmpresa(titulo, texto, fkempresa, id) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarAnotacaoEmpresa() "
  );
  var instrucaoSql = `
      UPDATE anotacoes 
      SET titulo = "${titulo}", 
      texto = "${texto}",
      WHERE id = ${id} and fkempresa = ${fkempresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletarAnotacaoUsuario(id) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarAnotacaoUsuario()"
  );
  var instrucaoSql = `
        DELETE FROM anotacoes WHERE id = ${id};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletarAnotacaoEmpresa(id, fkempresa) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarAnotacaoEmpresa()"
  );
  var instrucaoSql = `
        DELETE FROM anotacoes WHERE id = ${id} and fkempresa = ${fkempresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  publicar,
  editarAnotacaoUsuario,
  editarAnotacaoEmpresa,
  deletarAnotacaoUsuario,
  deletarAnotacaoEmpresa,
};
