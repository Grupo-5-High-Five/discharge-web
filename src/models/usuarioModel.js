const { desativar } = require("../controllers/usuarioController");
var database = require("../database/config");
const nodemailer = require("nodemailer");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucaoSql = `
        SELECT id, nome, email, cargo FROM funcionario WHERE email = ? AND senha = ?;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [email, senha]); // Passando parâmetros
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, cpf, tipo, senha, fkempresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha
  );
  var instrucaoSql = `
        INSERT INTO funcionario (nome, email, cpf, cargo, senha, fkempresa) VALUES (?, ?, ?, ?, ?, ?);
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [nome, email, cpf, tipo, senha, fkempresa]); // Passando parâmetros
}

function listar(fkempresa) {
  var instrucaoSql = `SELECT idFuncionario as id, nome as nome, cpf, fkempresa FROM funcionario WHERE fkempresa = ? AND statusFuncionario = "ativo";`;
  return database.executar(instrucaoSql, [fkempresa]); // Passando o parâmetro
}

function desativarFuncionario(idFuncionarioDesativar) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",
    idFuncionarioDesativar
  );
  var instrucaoSql = `
    UPDATE funcionario
    SET statusFuncionario = "inativo"
    WHERE id IN (?);
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [idFuncionarioDesativar]); // Passando o parâmetro
}

function mudarCargo(idFuncionarioDesativar, cargo) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",
    idFuncionarioDesativar
  );
  var instrucaoSql = `
    UPDATE funcionario
    SET cargo = ?
    WHERE id IN (?);
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [cargo, idFuncionarioDesativar]); // Passando parâmetros
}

function validarEmail(email) {
  console.log("ACESSEI O USUARIO MODEL PARA VALIDAR EMAIL \n");
  var instrucaoSql = `SELECT email FROM funcionario WHERE email = ?;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [email]); // Passando o parâmetro
}

function emailEnviar(email, token) {
  console.log("ACESSEI O USUARIO MODEL PARA ENVIAR EMAIL \n");

  var transporter = nodemailer.createTransport({
    service: "gmail", // Ou outro serviço de email
    auth: {
      user: process.env.MEU_EMAIL,
      pass: process.env.MINHA_SENHA,
    },
  });

  var mailOptions = {
    from: process.env.MEU_EMAIL,
    to: email,
    subject: "Recuperação de Senha",
    text: `Aqui está o token para redefinição da da sua senha.
                Não compartilhe com ninguém
                
                ${token}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Erro ao enviar e-mail: ", error);
        reject(error); // Retorna o erro
      } else {
        console.log("Email enviado: " + info.response);
        resolve(info.response); // Sucesso
      }
    });
  });
}

function guardarInfos(email, token, dataExpiracao) {
  var instrucaoSql = `
        INSERT INTO tokens_recuperacao (email, token, data_criacao, data_expiracao) 
        VALUES (?, ?, NOW(), ?)
        ON DUPLICATE KEY UPDATE 
            token = ?, 
            data_criacao = NOW(), 
            data_expiracao = ?;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [email, token, dataExpiracao, token, dataExpiracao]); // Passando os parâmetros
}

function validarToken(tokenRecuperacao) {
  console.log("Analisando o token: " + tokenRecuperacao);

  return new Promise((resolve, reject) => {
    // Consulta SQL para verificar o token e se não está expirado
    const instrucaoSql = `SELECT * FROM tokens_recuperacao WHERE token = ? AND data_expiracao > NOW()`;

    // Executa a consulta
    database
      .executar(instrucaoSql, [tokenRecuperacao])
      .then((resultado) => {
        // Verifica se o resultado é um array e possui elementos
        if (Array.isArray(resultado) && resultado.length > 0) {
          // Token válido
          console.log("Token válido. Cheguei aqui:");

          resolve(resultado); // Retorna os dados do token
        } else {
          // Token inválido ou expirado
          reject(new Error("Token inválido ou expirado."));
        }
      })
      .catch((err) => {
        console.error("Erro ao validar token: ", err);
        reject(err);
      });
  });
}

function atualizarSenha(email, novaSenha) {
  var instrucaoSql = `
    UPDATE funcionario
    SET senha = ?
    WHERE email = ?;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [novaSenha, email]); // Passando parâmetros
}

function romoverToken(email, tokenRecuperacao) {
  return new Promise((resolve, reject) => {
    const instrucaoSql = `DELETE FROM tokens_recuperacao WHERE email = ? AND token = ?;`;
    database
      .executar(instrucaoSql, [email, tokenRecuperacao])
      .then((resultado) => {
        if (resultado.affectedRows > 0) {
          resolve("Token excluído com sucesso.");
        } else {
          reject(new Error("Nenhum token encontrado para o email fornecido."));
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir o token: ", err);
        reject(err);
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
  validarEmail,
  guardarInfos,
  validarToken,
  atualizarSenha,
  romoverToken,
};
