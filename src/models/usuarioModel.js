const { desativar } = require("../controllers/usuarioController");
var database = require("../database/config")
const nodemailer = require("nodemailer");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idFuncionario, nome, email FROM funcionario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, cpf, tipo, senha, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO funcionario (nome, email, cpf, cargo, senha, fkEmpresa) VALUES ('${nome}', '${email}', '${cpf}', '${tipo}', '${senha}', ${fkEmpresa});`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(fkEmpresa) {
    var instrucaoSql = `SELECT idFuncionario as id, nome as nome, cpf, fkEmpresa FROM funcionario where fkEmpresa = ${fkEmpresa} and statusFuncionario = "ativo"`;

    return database.executar(instrucaoSql);
}

function desativarFuncionario(idFuncionarioDesativar) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idFuncionarioDesativar);
    var instrucaoSql = `
    UPDATE funcionario
    SET statusFuncionario = "inativo"
    WHERE idFuncionario IN (${idFuncionarioDesativar});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mudarCargo(idFuncionarioDesativar, cargo) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idFuncionarioDesativar);
    var instrucaoSql = `
    UPDATE funcionario
    SET cargo = "${cargo}"
    WHERE idFuncionario IN (${idFuncionarioDesativar});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function validarEmail(email) {
    console.log("ACESSEI O USUARIO MODEL PARA VALIDAR EMAIL \n");

    // Consulta no banco de dados para verificar se o e-mail existe
    var instrucaoSql = `SELECT email FROM funcionario WHERE email = '${email}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function emailEnviar(email) {
    console.log("ACESSEI O USUARIO MODEL PARA ENVIAR EMAIL \n");

    var transporter = nodemailer.createTransport({
        service: 'gmail', // Ou outro serviço de email
        auth: {
            user: process.env.MEU_EMAIL,
            pass: process.env.MINHA_SENHA
        }
    });

    var mailOptions = {
        from: process.env.MEU_EMAIL,
        to: email,
        subject: 'Recuperação de Senha',
        text: 'Aqui vai o conteúdo do seu e-mail, como um link para redefinir a senha.'
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log("Erro ao enviar e-mail: ", error);
                reject(error); // Retorna o erro
            } else {
                console.log('Email enviado: ' + info.response);
                resolve(info.response); // Sucesso
            }
        });
    });
}

module.exports = {
    autenticar,
    cadastrar,
    listar,
    desativarFuncionario,
    mudarCargo,
    emailEnviar,
    validarEmail
};