var usuarioModel = require("../models/usuarioModel");
const crypto = require("crypto");
const { format } = require("date-fns");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          res.json(resultadoAutenticar[0]);
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var cpf = req.body.cpfServer;
  var tipo = req.body.tipoServer;
  var senha = req.body.senhaServer;
  var fkempresa = req.params.fkempresa;

  // Faça as validações dos valores
  if (nome == undefined) {
    console.log(nome);
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu CPF está undefined!");
  } else if (tipo == undefined) {
    res.status(400).send("Seu tipo está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (fkempresa == undefined) {
    res.status(400).send("Sua matriz está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, email, cpf, tipo, senha, fkempresa)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listar(req, res) {
  var fkempresa = req.params.fkempresa;
  usuarioModel.listar(fkempresa).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function desativarFuncionario(req, res) {
  var idFuncionarioDesativar = req.body.idFuncionarioDesativar;

  usuarioModel
    .desativarFuncionario(idFuncionarioDesativar)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function mudarCargo(req, res) {
  var idFuncionarioDesativar = req.body.idFuncionarioDesativar;
  var cargo = req.body.cargo;

  usuarioModel
    .mudarCargo(idFuncionarioDesativar, cargo)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

async function emailEnviar(req, res) {
  const email = req.body.email; // E-mail enviado pelo cliente
  const token = crypto.randomBytes(8).toString("hex");
  const dataExpiracao = format(new Date(Date.now() + 60000), "yyyy-MM-dd HH:mm:ss");

  if (!email) {
    return res.status(400).json({ success: false, message: "O e-mail está indefinido!" });
  }

  try {
    // Validar se o e-mail existe no banco
    const resultadoValidacao = await usuarioModel.validarEmail(email);

    if (resultadoValidacao.length > 0) {
      // Se o e-mail for encontrado, guardar o token e a data de expiração
      await usuarioModel.guardarInfos(email, token, dataExpiracao);

      // Enviar o e-mail
      await usuarioModel.emailEnviar(email, token); // Passando o token para o e-mail
      return res.status(200).json({ success: true, message: "E-mail enviado com sucesso!" });
    } else {
      // Se o e-mail não for encontrado no banco de dados
      return res.status(404).json({ success: false, message: "E-mail não cadastrado!" });
    }
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ success: false, message: "Erro ao processar a solicitação: " + erro.message });
  }
}

async function atualizarSenha(req, res) {
  console.log("Requisição recebida para atualizar senha"); // Log
  const novaSenha = req.body.novaSenha;
  const tokenRecuperacao = req.body.tokenRecuperacao;

  console.log(tokenRecuperacao);

  if (!novaSenha) {
    console.log("Senha indefinida"); // Log
    return res.status(400).json({ success: false, message: "Sua senha está indefinida!" });
  }

  if (!tokenRecuperacao) {
    console.log("Token indefinido"); // Log
    return res.status(400).json({ success: false, message: "O token está indefinido!" });
  }

  try {
    // Validar se o token existe no banco
    const resultadoValidacao = await usuarioModel.validarToken(tokenRecuperacao);
    console.log("Resultado da validação do token:", resultadoValidacao); // Log
    if (resultadoValidacao.length > 0) {
      const email = resultadoValidacao[0].email;
      console.log("Email encontrado:", email); // Log
      await usuarioModel.atualizarSenha(email, novaSenha);
      await usuarioModel.romoverToken(email, tokenRecuperacao);
      return res.status(200).json({ success: true, message: "Senha atualizada!" });
    } else {
      console.log("Token não encontrado no banco"); // Log
      return res.status(404).json({ success: false, message: "Token não encontrado!" });
    }
  } catch (erro) {
    console.log("Erro ao atualizar a senha:", erro); // Log
    console.log("----------------------------------------------------------------------------------------------");
    console.log(erro.message);
    return res.status(500).json({ success: false, message: erro.message });
  }
}

module.exports = {
  autenticar,
  cadastrar,
  listar,
  desativarFuncionario,
  mudarCargo,
  emailEnviar,
  atualizarSenha,
};
