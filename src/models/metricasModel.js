var database = require("../database/config");

function cadastrar(energiaMaxima, co2Maximo, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO metrica (energiaMaxima, co2Maximo, fkEmpresa) VALUES ('${energiaMaxima}', '${co2Maximo}', ${fkEmpresa});`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(fkEmpresa) {
    var instrucaoSql = `SELECT idMetricas as id, energiaMaxima as energiaMaxima, co2Maximo as co2Maximo, fkEmpresa FROM metrica where fkEmpresa = ${fkEmpresa}`;
    return database.executar(instrucaoSql);
}

function editarMetrica(energiaMaxima, co2Maximo, fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", fkEmpresa);
    var instrucaoSql = `
    UPDATE metrica
    SET energiaMaxima = "${energiaMaxima}",
    co2Maximo = "${co2Maximo}"
    WHERE fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", fkEmpresa);
    var instrucaoSql = `
        DELETE FROM metrica WHERE fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listar,
    editarMetrica,
    deletar
}
