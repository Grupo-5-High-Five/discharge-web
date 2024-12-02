var fkEmpresa = sessionStorage.ID_EMPRESA;

function listarMetricas() {
  fetch(`/metricas/listarMetricas/${fkEmpresa}`, {
    method: "GET",
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error(`Erro ao listar métricas. Código: ${resposta.status}`);
      }
      return resposta.json();
    })
    .then((metricas) => {
      if (metricas.length != 0) {
        // Preenche os valores dos inputs com base nos dados retornados
        metricas.forEach((metrica) => {
          sessionStorage.ID_METRICA = metrica.id;

          // Atribuir valores retornados aos inputs do formulário
          document.getElementById("input_co2_maximo_anual").value =
            metrica.co2_maximo_anual || 0;
          document.getElementById("input_consumo_maximo_mensal").value =
            metrica.consumo_maximo_mensal || 0;
          document.getElementById(
            "input_potencia_reativa_atrasada_maxima_semanal"
          ).value = metrica.potencia_reativa_atrasada_maxima_semanal || 0;
          document.getElementById(
            "input_potencia_reativa_adiantada_maxima_semanal"
          ).value = metrica.potencia_reativa_adiantada_maxima_semanal || 0;
          document.getElementById(
            "input_fator_potencia_atrasado_maxima_diario"
          ).value = metrica.fator_potencia_atrasado_maxima_diario || 0;
          document.getElementById(
            "input_fator_potencia_adiantado_maxima_diario"
          ).value = metrica.fator_potencia_adiantado_maxima_diario || 0;
        });
      } else {
        // sessionStorage.removeItem("ID_METRICA");
        // // Opcional: Limpar os inputs caso não haja métricas
        // document.querySelectorAll('input[type="number"]').forEach((input) => {
        //   input.value = "";
        // });
      }
    })
    .catch(function (erro) {
      console.log(`#ERRO: ${erro}`);
    });
}

function editarMetrica(column, value) {
  event.preventDefault();

  if (!value || value == null) {
    value = 0.0;
  }

  fetch(`/metricas/editarMetrica/${fkEmpresa}/${column}/${value}`, {
    method: "PUT",
  })
    .then(function (resposta) {
      if (resposta.ok) {
        window.alert("Métricas atualizadas com sucesso!");
        // Redirecionar ou atualizar a interface
      } else if (resposta.status == 404) {
        window.alert("Erro 404: Endpoint não encontrado.");
      } else {
        throw new Error(
          `Erro ao atualizar as métricas. Código da resposta: ${resposta.status}`
        );
      }
    })
    .catch(function (erro) {
      console.error("#ERRO:", erro);
      window.alert(
        "Ocorreu um erro inesperado ao tentar atualizar as métricas."
      );
    });
}

function deletarMetrica(column, value) {
  fetch(`/metricas/deletar/${fkEmpresa}/${column}`, {
    method: "PUT",
  })
    .then(function (resposta) {
      if (resposta.ok) {
        window.alert(
          "Post deletado com sucesso pelo usuario de email: " +
            sessionStorage.getItem("EMAIL_USUARIO") +
            "!"
        );
        const input = value;
        if (input) {
          input.value = 0; // Define o valor padrão como 0
        }
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
