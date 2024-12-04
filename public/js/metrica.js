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
      }
    })
    .catch(function (erro) {
      console.log(`#ERRO: ${erro}`);
    });
}

function editarMetrica(column, value) {
  event.preventDefault();

  if (!value || value == null || isNaN(value)) {
    let timerInterval;
    Swal.fire({
      showConfirmButton: false,
      title: "Não foi possivel editar a métrica!",
      html: "Valor inválido",
      icon: "error",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        let timerBar = document.querySelector(".swal2-timer-progress-bar");
        timerBar.style.backgroundColor = "#80f73b";
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    })
  }
  else {
    fetch(`/metricas/editarMetrica/${fkEmpresa}/${column}/${value}`, {
      method: "PUT",
    })
      .then(function (resposta) {
        if (resposta.ok) {
          let timerInterval;
          Swal.fire({
            showConfirmButton: false,
            title: "Metrica editada com sucesso!",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              let timerBar = document.querySelector(".swal2-timer-progress-bar");
              timerBar.style.backgroundColor = "#80f73b";
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          })
        } else if (resposta.status == 404) {
          let timerInterval;
          Swal.fire({
            showConfirmButton: false,
            title: "Não foi possível atualizar a métrica!",
            html: "Erro 404: Endpoint não encontrado!",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              let timerBar = document.querySelector(".swal2-timer-progress-bar");
              timerBar.style.backgroundColor = "#80f73b";
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          })
        } else {
          throw new Error(
            `Erro ao atualizar as métricas. Código da resposta: ${resposta.status}`
          );
        }
      })
      .catch(function (erro) {
        console.error("#ERRO:", erro);
        let timerInterval;
        Swal.fire({
          showConfirmButton: false,
          title: "Não foi possível atualizar a métrica!",
          html: "Ocorreu um erro inesperado ao tentar atualizar as métricas!",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            let timerBar = document.querySelector(".swal2-timer-progress-bar");
            timerBar.style.backgroundColor = "#80f73b";
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        })
      });
  }
}

function deletarMetrica(column, value) {
  fetch(`/metricas/deletar/${fkEmpresa}/${column}`, {
    method: "PUT",
  })
    .then(function (resposta) {
      if (resposta.ok) {
        let timerInterval;
        Swal.fire({
          showConfirmButton: false,
          title: "Métrica deletada com sucesso!",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            let timerBar = document.querySelector(".swal2-timer-progress-bar");
            timerBar.style.backgroundColor = "#80f73b";
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        })
        const input = value;
        if (input) {
          input.value = 0; // Define o valor padrão como 0
        }
      } else if (resposta.status == 404) {
        let timerInterval;
        Swal.fire({
          showConfirmButton: false,
          title: "Não foi possível deletar a métrica!",
          html: "Erro 404: Endpoint não encontrado!",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            let timerBar = document.querySelector(".swal2-timer-progress-bar");
            timerBar.style.backgroundColor = "#80f73b";
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        })
      } else {
        throw (
          "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
          resposta.status
        );
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      let timerInterval;
      Swal.fire({
        showConfirmButton: false,
        title: "Não foi possível deletar a métrica!",
        html: "Ocorreu um erro inesperado ao tentar deletar as métricas!",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          let timerBar = document.querySelector(".swal2-timer-progress-bar");
          timerBar.style.backgroundColor = "#80f73b";
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      })
    });
}
