// Função permissionamento

const cargo = sessionStorage.getItem("CARGO_USUARIO");

const btnTec = document.getElementById("btn_tec");
const btnCon = document.getElementById("btn_con");

const dashTec = document.getElementById("dash-tec");
const dashCon = document.getElementById("dash-con");

if (cargo == "eficiencia") {
  btnCon.style.display = "none";

  btnTec.classList.add("ativo");
  btnCon.classList.remove("ativo");

  dashTec.style.display = "grid";
  dashCon.style.display = "none";
} else if (cargo == "consumo") {
  btnTec.style.display = "none";

  btnCon.classList.add("ativo");
  btnTec.classList.remove("ativo");

  dashCon.style.display = "grid";
  dashTec.style.display = "none";
}

// Função que troca as telas da dashboard

const dashConTitle = document.getElementById("dash-con-title");

function trocarDash(index) {
  if (index == 1) {
    btnTec.classList.add("ativo");
    btnCon.classList.remove("ativo");

    dashTec.style.display = "grid";
    dashCon.style.display = "none";
    dashConTitle.innerHTML = "<h1>Qualidade Energética Geral</h1>";
  } else {
    btnCon.classList.add("ativo");
    btnTec.classList.remove("ativo");

    dashCon.style.display = "grid";
    dashTec.style.display = "none";
    dashConTitle.innerHTML = "<h1>Eficiência Energética entre XX/XX e XX/XX (XXXX)</h1>";
  }
}

// ----------------------------------------------------------
// Configuração dos gráficos com ApexCharts
// ----------------------------------------------------------

// ----------------------------------------------------------
// Gráfico: Potência Reativa Adiantada
// ----------------------------------------------------------

var optionsEnergiaAtrasada = {
  chart: {
    type: "line",
    width: "100%",
    height: "100%",
  },
  stroke: {
    width: [2, 4],
    curve: "smooth",
    colors: ["#47c753", "#E0841F"],
  },
  markers: {
    size: 4,
    colors: ["#E0841F"],
  },
  series: [
    {
      name: "Potência Reativa",
      type: "column",
      data: [],
    },
    {
      name: "Fator de Potência",
      type: "line",
      data: [],
    },
  ],
  xaxis: {
    categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  },
  yaxis: [
    {
      title: { text: "Potência Reativa" },
    },
    {
      opposite: true,
      max: 10,
      title: { text: "Fator de Potência" },
    },
  ],
  colors: ["#5af76988", "#E0841F"],
  tooltip: { shared: true, intersect: false },
};

let graphPotenciaAtrasada = new ApexCharts(document.querySelector("#graph_ener_atr"), optionsEnergiaAtrasada);
graphPotenciaAtrasada.render();

// ----------------------------------------------------------
// Gráfico: Potência Reativa Atrasada
// ----------------------------------------------------------

var optionsEnergiaAdiantada = {
  chart: {
    type: "line",
    width: "100%",
    height: "100%",
  },
  stroke: {
    width: [2, 4],
    curve: "smooth",
    colors: ["#0026ff", "#ebc000"],
  },
  markers: {
    size: 4,
    colors: ["#ebc000"],
  },
  series: [
    {
      name: "Potência Reativa",
      type: "column",
      data: [],
    },
    {
      name: "Fator de Potência",
      type: "line",
      data: [],
    },
  ],
  xaxis: {
    categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  },
  yaxis: [
    {
      title: { text: "Potência Reativa" },
    },
    {
      opposite: true,
      max: 10,
      title: { text: "Fator de Potência" },
    },
  ],
  colors: ["#405bf3af", "#ebc000"],
  tooltip: { shared: true, intersect: false },
};

let graphPotenciaAdiantada = new ApexCharts(document.querySelector("#graph_ener_adi"), optionsEnergiaAdiantada);
graphPotenciaAdiantada.render();

// ----------------------------------------------------------
// Gráfico: Consumo de Energia com Média Móvel
// ----------------------------------------------------------

const dadosConsumo = [12, 19, 3, 5, 2, 3, 8, 12];

var optionsConsumoMedia = {
  chart: {
    type: "line",
    width: "100%",
    height: "100%",
  },
  stroke: {
    width: 4,
    curve: "smooth",
  },
  markers: {
    size: 5,
    colors: ["#4BC0C0", "#FF6384"],
  },
  series: [
    {
      name: "Consumo de Energia",
      data: [],
    },
    {
      name: "Média Móvel",
      data: [], // Calculada separadamente
    },
  ],
  xaxis: {
    categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  },
  colors: ["#4BC0C0", "#FF6384"],
  tooltip: { shared: true, intersect: false },
};

new ApexCharts(document.querySelector("#graph_con_med"), optionsConsumoMedia).render();

// ----------------------------------------------------------
// Gráfico: Consumo de energia
// ----------------------------------------------------------

var optionsEmissaoGases = {
  chart: {
    type: "line",
    width: "100%",
    height: "100%",
  },
  stroke: {
    width: 4,
    curve: "smooth",
  },
  markers: {
    size: 5,
    colors: ["#4BC0C0", "#DBB100"],
  },
  series: [
    {
      name: "Consumo de Energia",
      data: [],
    },
    {
      name: "Consumo de Energia Ano Anterior",
      data: [],
    },
  ],
  xaxis: {
    categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  },
  colors: ["#4BC0C0", "#DBB100"],
};

let graphEmissao = new ApexCharts(document.querySelector("#graph_emissao"), optionsEmissaoGases);
graphEmissao.render();

tippy("#infoTooltip", {
  content: `
      <div>
          <strong>Limites definidos Σ:</strong><br><br>
          <ul>
              <li>Σ - Emissão CO2 anual: 50</li>
              <li>Σ - Consumo de energia no mês: 45</li>
              <li>Σ - Potência Reativa Adiantada Semanal: 234</li>
              <li>Σ - Potência Reativa Atrasada Semanal: 243</li>
              <li>Σ - Fator de Potência Adiantado Semanal: 1</li>
              <li>Σ - Fator de Potência Adiantado Atrasado: 1</li>
          </ul>
      </div>
  `,
  allowHTML: true, // Enable HTML content
  theme: "custom",
  animation: "scale",
  interactive: true, // Allow interaction with the tooltip
  placement: "right", // Change position
  arrow: true,
  maxWidth: 250, // Max width of the tooltip
});

// ----------------------------------------------------------
// Fetch
// ----------------------------------------------------------

var fkEmpresa = sessionStorage.ID_EMPRESA;

function atualizarGraph() {
  listarVisaoEnergetica(fkEmpresa);
  listarGraphTendencia(fkEmpresa);
  listarGraphAtrasado(fkEmpresa);
  listarGraphAdiantado(fkEmpresa);
  // listarGraphConsumo(fkEmpresa);
  // listarQualidade(fkEmpresa);

  setTimeout(() => {
    atualizarGraph();
  }, 3000); // 5 minutos
}

function listarVisaoEnergetica(fkEmpresa) {
  var media_co2 = document.getElementById("media_co2");
  var emissao_co2 = document.getElementById("emissao_co2");
  var meta_emissao = document.getElementById("meta_emissao");

  var media_consumo = document.getElementById("media_consumo");
  var consumo_ano = document.getElementById("consumo_ano");
  var meta_consumo = document.getElementById("meta_consumo");

  fetch(`/dashboard/listarVisaoEnergetica/${fkEmpresa}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          media_co2.textContent = resposta[0].media_emissao;
          emissao_co2.textContent = resposta[0].emissao_ano;
          meta_emissao.innerHTML = `${resposta[0].meta_emissao}%<p>6</p>`;

          media_consumo.textContent = resposta[0].media_consumo;
          consumo_ano.textContent = resposta[0].consumo_ano;
          meta_consumo.innerHTML = `${resposta[0].meta_consumo}%<p>6</p>`;
        });
      } else {
        console.log("Nenhum valor encontrado ou ocorreu algum erro na API!");
        alert("Nenhum valor encontrado ou ocorreu algum erro na API!");
      }
    })
    .catch(function (error) {
      console.log(`Erro na captura dos dados para o gráfico: ${error.message}`);
      // alert(`Erro na captura dos dados para o gráfico: ${error.message}`);
    });

  return false;
}

function listarGraphTendencia(fkEmpresa) {
  fetch(`/dashboard/listarGraphTendencia/${fkEmpresa}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          optionsEmissaoGases.series[0].data = [];
          optionsEmissaoGases.series[1].data = [];

          for (let i = 0; i < 12; i++) {
            // Convertendo os valores de consumo para números
            let consumoAtual = parseFloat(resposta[i].consumo_atual);
            let consumoPassado = parseFloat(resposta[i].consumo_passado);
            // Adicionando os valores ao gráfico
            optionsEmissaoGases.series[0].data.push(consumoAtual);
            optionsEmissaoGases.series[1].data.push(consumoPassado);
          }

          graphEmissao.updateSeries(optionsEmissaoGases.series);
        });
      } else {
        console.log("Nenhum valor encontrado ou ocorreu algum erro na API!");
        alert("Nenhum valor encontrado ou ocorreu algum erro na API!");
      }
    })
    .catch(function (error) {
      console.log(`Erro na captura dos dados para o gráfico: ${error.message}`);
      // alert(`Erro na captura dos dados para o gráfico: ${error.message}`);
    });

  return false;
}

function listarGraphAtrasado(fkEmpresa) {
  fetch(`/dashboard/listarGraphAtrasado/${fkEmpresa}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          optionsEnergiaAtrasada.series[0].data = [];
          optionsEnergiaAtrasada.series[1].data = [];

          for (let i = 0; i < 7; i++) {
            // Formatando o fator de potência total
            let fatorPotenciaTotal = (parseFloat(resposta[i].fator_potencia_total) / 1000).toFixed(1).replace(".", ",");
            console.log(fatorPotenciaTotal);

            // Mantendo a potência reativa atrasada sem alteração
            let potenciaReativaAtrasada = resposta[i].potencia_reativa_atrasada;

            // Adicionando os valores ao gráfico
            optionsEnergiaAtrasada.series[0].data.push(potenciaReativaAtrasada);
            optionsEnergiaAtrasada.series[1].data.push(fatorPotenciaTotal);
          }

          graphPotenciaAtrasada.updateSeries(optionsEnergiaAtrasada.series);
        });
      } else {
        console.log("Nenhum valor encontrado ou ocorreu algum erro na API!");
        alert("Nenhum valor encontrado ou ocorreu algum erro na API!");
      }
    })
    .catch(function (error) {
      console.log(`Erro na captura dos dados para o gráfico: ${error.message}`);
      // alert(`Erro na captura dos dados para o gráfico: ${error.message}`);
    });

  return false;
}

function listarGraphAdiantado(fkEmpresa) {
  fetch(`/dashboard/listarGraphAdiantado/${fkEmpresa}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          optionsEnergiaAdiantada.series[0].data = [];
          optionsEnergiaAdiantada.series[1].data = [];

          for (let i = 0; i < 7; i++) {
            // Formatando o fator de potência total
            let fatorPotenciaTotal = (parseFloat(resposta[i].fator_potencia_total) / 1000).toFixed(1).replace(".", ",");
            console.log(fatorPotenciaTotal);

            // Mantendo a potência reativa atrasada sem alteração
            let potenciaReativaAdiantado = resposta[i].potencia_reativa_adiantada;

            // Adicionando os valores ao gráfico
            optionsEnergiaAdiantada.series[0].data.push(potenciaReativaAdiantado);
            optionsEnergiaAdiantada.series[1].data.push(fatorPotenciaTotal);
          }

          graphPotenciaAdiantada.updateSeries(optionsEnergiaAdiantada.series);
        });
      } else {
        console.log("Nenhum valor encontrado ou ocorreu algum erro na API!");
        alert("Nenhum valor encontrado ou ocorreu algum erro na API!");
      }
    })
    .catch(function (error) {
      console.log(`Erro na captura dos dados para o gráfico: ${error.message}`);
      // alert(`Erro na captura dos dados para o gráfico: ${error.message}`);
    });

  return false;
}

function listarGraphConsumo(fkEmpresa) {
  fetch(`/dashboard/listarGraphConsumo/${fkEmpresa}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        });
      } else {
        console.log("Nenhum valor encontrado ou ocorreu algum erro na API!");
        alert("Nenhum valor encontrado ou ocorreu algum erro na API!");
      }
    })
    .catch(function (error) {
      console.log(`Erro na captura dos dados para o gráfico: ${error.message}`);
      // alert(`Erro na captura dos dados para o gráfico: ${error.message}`);
    });

  return false;
}

function listarQualidade(fkEmpresa) {
  fetch(`/dashboard/listarQualidade/${fkEmpresa}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        });
      } else {
        console.log("Nenhum valor encontrado ou ocorreu algum erro na API!");
        alert("Nenhum valor encontrado ou ocorreu algum erro na API!");
      }
    })
    .catch(function (error) {
      console.log(`Erro na captura dos dados para o gráfico: ${error.message}`);
      // alert(`Erro na captura dos dados para o gráfico: ${error.message}`);
    });

  return false;
}
