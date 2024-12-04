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
      max: 100,
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
      max: 100,
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

var optionsConsumoPrevisao = {
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
      name: "Previsão de consumo",
      data: [], // Calculada separadamente
    },
  ],
  xaxis: {
    categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  },
  colors: ["#4BC0C0", "#FF6384"],
  tooltip: { shared: true, intersect: false },
};

let graphConsumo = new ApexCharts(document.querySelector("#graph_con_med"), optionsConsumoPrevisao);
graphConsumo.render();

// ----------------------------------------------------------
// Gráfico: Consumo de energia
// ----------------------------------------------------------

var optionsTendenciaAnual = {
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

let graphTendencia = new ApexCharts(document.querySelector("#graph_emissao"), optionsTendenciaAnual);
graphTendencia.render();

// ----------------------------------------------------------
// Fetch
// ----------------------------------------------------------

var fkEmpresa = sessionStorage.ID_EMPRESA;

function atualizarGraph() {
  listarVisaoEnergetica(fkEmpresa);
  listarGraphTendencia(fkEmpresa);
  listarGraphAtrasado(fkEmpresa);
  listarGraphAdiantado(fkEmpresa);
  listarGraphConsumo(fkEmpresa);
  listarQualidade(fkEmpresa);

  listarMetricas(fkEmpresa);
  atualizarCores();

  setTimeout(() => {
    atualizarGraph();
  }, 10000); // 2 minutos
}

function listarVisaoEnergetica(fkEmpresa) {
  const media_co2 = document.getElementById("media_co2");
  const emissao_co2 = document.getElementById("emissao_co2");
  const meta_emissao = document.getElementById("meta_emissao");

  const media_consumo = document.getElementById("media_consumo");
  const consumo_ano = document.getElementById("consumo_ano");
  const meta_consumo = document.getElementById("meta_consumo");

  fetch(`/dashboard/listarVisaoEnergetica/${fkEmpresa}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

          media_co2.textContent = parseFloat(resposta[0].media_emissao).toFixed(2);
          emissao_co2.textContent = parseFloat(resposta[0].emissao_ano).toFixed(2);
          meta_emissao.textContent = `${parseFloat(resposta[0].meta_emissao).toFixed(0)}%`;

          sessionStorage.EMISSAO_ANUAL = JSON.stringify({
            media_co2: parseFloat(resposta[0].media_emissao).toFixed(2),
            emissao_co2: parseFloat(resposta[0].emissao_ano).toFixed(2),
            meta_emissao: parseFloat(resposta[0].meta_emissao).toFixed(0),
          });

          media_consumo.textContent = Math.round(parseFloat(resposta[0].media_consumo)).toLocaleString("pt-BR");
          consumo_ano.textContent = Math.round(parseFloat(resposta[0].consumo_ano)).toLocaleString("pt-BR");
          meta_consumo.innerHTML = `${parseFloat(resposta[0].meta_consumo).toFixed(0)}%`;

          sessionStorage.CONSUMO_MENSAL = JSON.stringify({
            media_consumo: Math.round(parseFloat(resposta[0].media_consumo)).toLocaleString("pt-BR"),
            consumo_ano: Math.round(parseFloat(resposta[0].consumo_ano)).toLocaleString("pt-BR"),
            meta_consumo: parseFloat(resposta[0].meta_consumo).toFixed(0),
          });

          sessionStorage.ANO_ATUAL = resposta[0].ano_atual;
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
          optionsTendenciaAnual.series[0].data = [];
          optionsTendenciaAnual.series[1].data = [];

          for (let i = 0; i < resposta.length; i++) {
            // Convertendo os valores de consumo para números
            let consumoAtual = Math.round(parseFloat(resposta[i].consumo_atual)).toLocaleString("pt-BR");
            let consumoPassado = Math.round(parseFloat(resposta[i].consumo_passado)).toLocaleString("pt-BR");
            // Adicionando os valores ao gráfico
            optionsTendenciaAnual.series[0].data.push(consumoAtual);
            optionsTendenciaAnual.series[1].data.push(consumoPassado);
          }

          graphTendencia.updateSeries(optionsTendenciaAnual.series);
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

          for (let i = 0; i < resposta.length; i++) {
            // Formatando o fator de potência total
            let fatorPotenciaTotal = Math.round(parseFloat(resposta[i].fator_potencia_total)).toLocaleString("pt-BR");

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

          for (let i = 0; i < resposta.length; i++) {
            // Formatando o fator de potência total
            let fatorPotenciaTotal = Math.round(parseFloat(resposta[i].fator_potencia_total)).toLocaleString("pt-BR");

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
          optionsConsumoPrevisao.series[0].data = [];
          optionsConsumoPrevisao.series[1].data = [];

          for (let i = 0; i < resposta.length; i++) {
            // Convertendo os valores de consumo para números
            let consumo7dias = Math.round(parseFloat(resposta[i].consumo_ultimos_7_dias)).toLocaleString("pt-BR");
            let previsaoConsumo = Math.round(parseFloat(resposta[i].previsao_consumo_proximo_dia)).toLocaleString("pt-BR");
            // Adicionando os valores ao gráfico
            optionsConsumoPrevisao.series[0].data.push(consumo7dias);
            optionsConsumoPrevisao.series[1].data.push(previsaoConsumo);
          }

          graphConsumo.updateSeries(optionsConsumoPrevisao.series);
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
  const emissao_7dias = document.getElementById("emissao_7dias");
  const emissao_proximos_7dias = document.getElementById("emissao_proximos_7dias");

  const consumo_7dias = document.getElementById("consumo_7dias");
  const consumo_proximos_7dias = document.getElementById("consumo_proximos_7dias");

  const potencia_adiantada_7dias = document.getElementById("potencia_adiantada_7dias");
  const potencia_atrasada_7dias = document.getElementById("potencia_atrasada_7dias");

  fetch(`/dashboard/listarQualidade/${fkEmpresa}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

          emissao_7dias.textContent = parseFloat(resposta[0].emissao_tco2_ultimos_7_dias).toFixed(2);
          emissao_proximos_7dias.textContent = parseFloat(resposta[0].previsao_emissao_proxima_semana).toFixed(2);

          consumo_7dias.textContent = Math.round(parseFloat(resposta[0].consumo_ultimos_7_dias)).toLocaleString("pt-BR");
          consumo_proximos_7dias.textContent = Math.round(parseFloat(resposta[0].previsao_consumo_proxima_semana)).toLocaleString("pt-BR");

          potencia_adiantada_7dias.textContent = Math.round(parseFloat(resposta[0].potencia_reativa_adiantada_ultimos_7_dias)).toLocaleString("pt-BR");
          potencia_atrasada_7dias.textContent = Math.round(parseFloat(resposta[0].potencia_reativa_atrasada_ultimos_7_dias)).toLocaleString("pt-BR");

          sessionStorage.QUALIDADE = JSON.stringify({
            emissao_7dias: parseFloat(resposta[0].emissao_tco2_ultimos_7_dias).toFixed(2),
            emissao_proximos_7dias: parseFloat(resposta[0].previsao_emissao_proxima_semana).toFixed(2),
            consumo_7dias: Math.round(parseFloat(resposta[0].consumo_ultimos_7_dias)).toLocaleString("pt-BR"),
            consumo_proximos_7dias: Math.round(parseFloat(resposta[0].previsao_consumo_proxima_semana)).toLocaleString("pt-BR"),
            potencia_adiantada_7dias: Math.round(parseFloat(resposta[0].potencia_reativa_adiantada_ultimos_7_dias)).toLocaleString("pt-BR"),
            potencia_atrasada_7dias: Math.round(parseFloat(resposta[0].potencia_reativa_atrasada_ultimos_7_dias)).toLocaleString("pt-BR"),
          });

          function formatToBrazilianDate(dateString) {
            const [year, month, day] = dateString.split("-"); // Divide a data no formato original
            return `${day}/${month}/${year}`; // Reorganiza no formato DD/MM/AAAA
          }

          // Processa o período
          const period = resposta[0].periodo_ultimos_7_dias;
          const [startDate, endDate] = period.split(" à "); // Divide o período pelas datas
          const formattedStartDate = formatToBrazilianDate(startDate);
          const formattedEndDate = formatToBrazilianDate(endDate);

          // Junta as datas no formato brasileiro
          const formattedPeriod = `${formattedStartDate} à ${formattedEndDate}`;

          // Salva no sessionStorage
          sessionStorage.ULTIMA_SEMANA = formattedPeriod;

          const mesList = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

          sessionStorage.MES_ATUAL = mesList[parseInt(resposta[0].mes_atual) - 1];
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
function listarMetricas(fkEmpresa) {
  fetch(`/dashboard/listarMetricas/${fkEmpresa}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          sessionStorage.METRICAS_EMPRESA = JSON.stringify(resposta[0]);
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

const p_meta_emissao = document.getElementById("p_meta_emissao");
const p_meta_consumo = document.getElementById("p_meta_consumo");

const metricas = JSON.parse(sessionStorage.getItem("METRICAS_EMPRESA"));

p_meta_emissao.textContent = metricas.co2;
p_meta_consumo.textContent = metricas.consumo;

// TOOLTIPS

tippy("#infoTooltip", {
  content: `
      <div>
          <strong>Limites definidos Σ:</strong><br><br>

          Os limites são definidos na página de métricas, caso tenha alguma dúvida entre em contato com o suporte<br><br>
  
          <ul>
              <li>Σ - Emissão CO2 anual: ${metricas.co2}</li>
              <li>Σ - Consumo de energia no mês: ${metricas.consumo}</li>
              <li>Σ - Potência Reativa Adiantada Semanal: ${metricas.reativa_adiantada}</li>
              <li>Σ - Potência Reativa Atrasada Semanal: ${metricas.reativa_atrasada}</li>
              <li>Σ - Fator de Potência Adiantado Diário: ${metricas.fator_adiantada}</li>
              <li>Σ - Fator de Potência Atrasado Diário: ${metricas.fator_atrasado}</li>
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

const atrasadaTooltip = document.getElementById("atrasadaTooltip");
const adiantadaTooltip = document.getElementById("adiantadaTooltip");
const tendenciaTooltip = document.getElementById("tendenciaTooltip");
const consumoTooltip = document.getElementById("consumoTooltip");

// Tooltip para o gráfico de Potência Reativa e Fator de Potência Atrasada Semanal
tippy("#atrasadaTooltip", {
  content: `
      <div>
          <strong>Potência Reativa e Fator de Potência Atrasada (Semanal):</strong><br><br>

          Este gráfico exibe o comportamento semanal da Potência Reativa Atrasada, comparando as variações de energia nas últimas semanas. O fator de potência é analisado de forma a identificar as perdas de energia devido ao atraso na distribuição.<br><br>
  
          Se você tiver dúvidas sobre o gráfico, consulte a seção de ajuda ou entre em contato com o suporte.
      </div>
  `,
  allowHTML: true,
  theme: "custom",
  animation: "scale",
  interactive: true,
  placement: "right",
  arrow: true,
  maxWidth: 250,
});

// Tooltip para o gráfico de Potência Reativa e Fator de Potência Adiantada Semanal
tippy("#adiantadaTooltip", {
  content: `
      <div>
          <strong>Potência Reativa e Fator de Potência Adiantada (Semanal):</strong><br><br>

          Este gráfico mostra a Potência Reativa Adiantada, analisando as variações semanais do consumo de energia e seu impacto no sistema. O fator de potência é avaliado para entender a eficiência da distribuição de energia de forma antecipada.<br><br>

          Se precisar de mais informações, consulte a documentação ou entre em contato com o suporte.
      </div>
  `,
  allowHTML: true,
  theme: "custom",
  animation: "scale",
  interactive: true,
  placement: "right",
  arrow: true,
  maxWidth: 250,
});

// Tooltip para o gráfico de Tendência de Consumo de Energia
tippy("#tendenciaTooltip", {
  content: `
      <div>
          <strong>Tendência de Consumo de Energia:</strong><br><br>

          Este gráfico mostra a comparação do consumo de energia do mês atual com o mesmo mês do ano anterior. Ele ajuda a identificar tendências de aumento ou redução do consumo, fornecendo uma visão importante para a análise de eficiência energética.<br><br>

          Para mais detalhes sobre como interpretar os dados, consulte a seção de ajuda ou entre em contato com o suporte.
      </div>
  `,
  allowHTML: true,
  theme: "custom",
  animation: "scale",
  interactive: true,
  placement: "right",
  arrow: true,
  maxWidth: 250,
});

// Tooltip para o gráfico de Consumo de Energia Semanal
tippy("#consumoTooltip", {
  content: `
      <div>
          <strong>Consumo de Energia (Semanal):</strong><br><br>

          Este gráfico apresenta o consumo de energia semanal, com uma leitura detalhada dos dias anteriores e uma previsão para o consumo no próximo dia. Ele é útil para monitorar variações e ajustar os recursos de forma eficiente.<br><br>

          Se precisar de mais explicações, consulte os recursos adicionais ou entre em contato com o suporte.
      </div>
  `,
  allowHTML: true,
  theme: "custom",
  animation: "scale",
  interactive: true,
  placement: "right",
  arrow: true,
  maxWidth: 250,
});

const metaEmissao = metricas.co2;
const metaConsumo = metricas.consumo;
const metaAtrasada = metricas.reativa_atrasada;
const metaAdiantada = metricas.reativa_adiantada;

function atualizarCores() {
  // ----------------------------------------------------------------------
  // Visão energética -----------------------------------------------------
  // ----------------------------------------------------------------------

  const visaoEmissao = JSON.parse(sessionStorage.getItem("EMISSAO_ANUAL"));
  const visaoConsumo = JSON.parse(sessionStorage.getItem("CONSUMO_MENSAL"));

  // Emissão Anual

  const kpis_emissao = document.querySelectorAll(".emissao_ano");

  const porcentagemEmissao = metaEmissao / 100;

  if (visaoEmissao.media_emissao * 12 > metaEmissao) {
    kpis_emissao[0].classList.toggle("critico");
  } else if (visaoEmissao.media_emissao * 12 >= porcentagemEmissao * 80) {
    kpis_emissao[0].classList.toggle("alerta");
  }

  if (visaoEmissao.emissao_co2 > metaEmissao) {
    kpis_emissao[1].classList.toggle("critico");
  } else if (visaoEmissao.emissao_co2 * 12 >= porcentagemEmissao * 80) {
    kpis_emissao[1].classList.toggle("alerta");
  }

  if (visaoEmissao.meta_emissao >= 100) {
    kpis_emissao[2].classList.toggle("critico");
  } else if (visaoEmissao.meta_emissao >= 80) {
    kpis_emissao[2].classList.toggle("alerta");
  }

  // Consumo mensal

  const kpis_consumo = document.querySelectorAll(".consumo_mes");

  const porcentagemConsumo = metaConsumo / 100;

  if (visaoConsumo.media_consumo > metaConsumo) {
    kpis_consumo[0].classList.toggle("critico");
  } else if (visaoConsumo.media_consumo >= porcentagemConsumo * 80) {
    kpis_consumo[0].classList.toggle("alerta");
  }

  if (visaoConsumo.consumo_ano > metaConsumo) {
    kpis_consumo[1].classList.toggle("critico");
  } else if (visaoConsumo.consumo_ano >= porcentagemConsumo * 80) {
    kpis_consumo[1].classList.toggle("alerta");
  }

  if (visaoConsumo.meta_consumo >= 100) {
    kpis_consumo[2].classList.toggle("critico");
  } else if (visaoConsumo.meta_consumo >= 80) {
    kpis_consumo[2].classList.toggle("alerta");
  }

  // ----------------------------------------------------------------------
  // Detalhamento Semanal -------------------------------------------------
  // ----------------------------------------------------------------------

  const qualidade = JSON.parse(sessionStorage.getItem("QUALIDADE"));

  // Previsão emissão

  const kpis_prev_emissao = document.querySelectorAll(".prev_emissao");

  if (qualidade.emissao_7dias > metaEmissao / 12 / 4) {
    kpis_prev_emissao[0].classList.toggle("critico");
  } else if (qualidade.emissao_7dias >= (porcentagemEmissao / 12 / 4) * 80) {
    kpis_prev_emissao[0].classList.toggle("alerta");
  }

  if (qualidade.emissao_proximos_7dias > metaEmissao / 12 / 4) {
    kpis_prev_emissao[1].classList.toggle("critico");
  } else if (qualidade.emissao_proximos_7dias >= (porcentagemEmissao / 12 / 4) * 80) {
    kpis_prev_emissao[1].classList.toggle("alerta");
  }

  // Previsão consumo

  const kpis_prev_consumo = document.querySelectorAll(".prev_consumo");

  if (qualidade.consumo_7dias > metaConsumo / 4) {
    kpis_prev_consumo[0].classList.toggle("critico");
  } else if (qualidade.consumo_7dias >= (porcentagemConsumo / 4) * 80) {
    kpis_prev_consumo[0].classList.toggle("alerta");
  }

  if (qualidade.consumo_proximos_7dias > metaConsumo / 4) {
    kpis_prev_consumo[1].classList.toggle("critico");
  } else if (qualidade.consumo_proximos_7dias >= (porcentagemConsumo / 4) * 80) {
    kpis_prev_consumo[1].classList.toggle("alerta");
  }

  // Potencias

  const kpis_potencias = document.querySelectorAll(".potencia");

  const porcentagemAdiantada = metaAdiantada / 100;

  if (qualidade.potencia_adiantada_7dias > metaAdiantada) {
    kpis_potencias[0].classList.toggle("critico");
  } else if (qualidade.potencia_adiantada_7dias >= porcentagemAdiantada * 80) {
    kpis_potencias[0].classList.toggle("alerta");
  }

  const porcentagemAtrasada = metaAtrasada / 100;

  if (qualidade.potencia_atrasada_7dias > metaAtrasada / 4) {
    kpis_potencias[1].classList.toggle("critico");
  } else if (qualidade.potencia_atrasada_7dias >= porcentagemAtrasada * 80) {
    kpis_potencias[1].classList.toggle("alerta");
  }
}

// ---------------------------------------------------------------
// Ano
// ---------------------------------------------------------------

const ano = sessionStorage.getItem("ANO_ATUAL");

const ano_emissao_media = document.getElementById("ano_emissao_media");
ano_emissao_media.innerHTML += ` ${ano}(tCO2)`;

const ano_emissao_anual = document.getElementById("ano_emissao_anual");
ano_emissao_anual.innerHTML += ` ${ano}(tCO2)`;

const ano_consumo_media = document.getElementById("ano_consumo_media");
ano_consumo_media.innerHTML += ` ${ano}(KWh)`;
const ano_med_men = document.getElementById("ano_med_men");

// ---------------------------------------------------------------
// Mes
// ---------------------------------------------------------------

const mes = sessionStorage.getItem("MES_ATUAL");

const consumo_energia_mes = document.getElementById("consumo_energia_mes");
consumo_energia_mes.innerHTML += ` ${mes}(KWh)`;

// ---------------------------------------------------------------
// Semana
// ---------------------------------------------------------------

// Função que troca as telas da dashboard

const dashTitle = document.getElementById("titulo_dashboard");
const semana = sessionStorage.getItem("ULTIMA_SEMANA");

function trocarDash(index) {
  if (index == 1) {
    btnTec.classList.add("ativo");
    btnCon.classList.remove("ativo");

    dashTec.style.display = "grid";
    dashCon.style.display = "none";
    dashTitle.textContent = "Qualidade Energética Geral";
  } else {
    btnCon.classList.add("ativo");
    btnTec.classList.remove("ativo");

    dashCon.style.display = "grid";
    dashTec.style.display = "none";
    dashTitle.textContent = `Detalhamento Energético no período de ${semana}`;
  }
}

// Função permissionamento

const id = document.getElementById("name_user");

const user = sessionStorage.getItem("NOME_USUARIO");
const cargo = sessionStorage.getItem("CARGO_USUARIO");

if (id && user) {
  id.textContent = user;
}

const func = document.getElementById("func");

if (cargo != "admin") {
  func.style.display = "none";
}

// Abrir & Fechar menu

function menu() {
  const nav = document.getElementById("nav");
  nav.classList.toggle("aberto");
}

function sair() {
  sessionStorage.clear();
  window.location.href = "../login.html";
}

const btnTec = document.getElementById("btn_tec");
const btnCon = document.getElementById("btn_con");

const dashTec = document.getElementById("dash-tec");
const dashCon = document.getElementById("dash-con");

if (cargo == "eletricista") {
  btnCon.style.display = "none";

  btnTec.classList.add("ativo");
  btnCon.classList.remove("ativo");

  dashTec.style.display = "grid";
  dashCon.style.display = "none";
} else if (cargo == "financeiro") {
  btnTec.style.display = "none";

  btnCon.classList.add("ativo");
  btnTec.classList.remove("ativo");

  dashCon.style.display = "grid";
  dashTec.style.display = "none";
}
