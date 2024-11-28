var fkEmpresa = sessionStorage.ID_EMPRESA;

function cadastrarMetrica(event) {
  event.preventDefault();

  const form = document.getElementById("forms");
  const inputs = form.querySelectorAll('input[type="number"]');

  let met = {};
  const metricas = [
    "co2",
    "consumo",
    "reativa_atrasada",
    "reativa_adiantada",
    "fator_potencia_atrasado",
    "fator_potencia_adiantado",
  ];

  inputs.forEach((input, index) => {
    const name = metricas[index];
    met[name] = input.value ? parseFloat(input.value) : "default";
  });

  fetch(`/metricas/cadastrar/${fkEmpresa}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      co2: met.co2,
      consumo: met.consumo,
      reativa_atrasada: met.reativa_atrasada,
      reativa_adiantada: met.reativa_adiantada,
      fator_potencia_atrasado: met.fator_potencia_atrasado,
      fator_potencia_adiantado: met.fator_potencia_adiantado,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);
      if (resposta.ok) {
        console.log("Deu certo!");
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function listarMetricas() {
  fetch(`/metricas/listarMetricas/${fkEmpresa}`, {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((metricas) => {
        if (metricas.length != 0) {
          metricas.forEach((metrica) => {
            sessionStorage.ID_METRICA = metrica.id;
          });
        } else {
          sessionStorage.removeItem("ID_METRICA");
        }
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

if (sessionStorage.getItem("ID_METRICA")) {
  btn = document.getElementById("btn_cad");
  btn.style.display = "none";
}

function editarMetrica() {
  event.preventDefault();

  const form = document.getElementById("forms");
  const inputs = form.querySelectorAll('input[type="number"]');

  let met = {};
  const metricas = [
    "co2",
    "consumo",
    "reativa_atrasada",
    "reativa_adiantada",
    "fator_potencia_atrasado",
    "fator_potencia_adiantado",
  ];

  inputs.forEach((input, index) => {
    const name = metricas[index];
    met[name] = input.value ? parseFloat(input.value) : "default";
  });

  fetch(`/metricas/editarMetrica/${fkEmpresa}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      co2: met.co2,
      consumo: met.consumo,
      reativa_atrasada: met.reativa_atrasada,
      reativa_adiantada: met.reativa_adiantada,
      fator_potencia_atrasado: met.fator_potencia_atrasado,
      fator_potencia_adiantado: met.fator_potencia_adiantado,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        window.alert("Funciona"); // Precisamos colocar alguma tela ou modal aqui
      } else if (resposta.status == 404) {
        window.alert("Deu 404!"); // Precisamos colocar alguma tela ou modal aqui
      } else {
        throw (
          "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
          resposta.status
        ); // Precisamos colocar alguma tela ou modal aqui
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function deletarMetrica() {
  fetch(`/metricas/deletar/${fkEmpresa}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.ok) {
        window.alert(
          "Post deletado com sucesso pelo usuario de email: " +
            sessionStorage.getItem("EMAIL_USUARIO") +
            "!"
        );
        window.location = "/dashboard/mural.html";
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw (
          "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
          resposta.status
        );
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}
