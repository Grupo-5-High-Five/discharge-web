// Função permissionamento

const cargo = sessionStorage.getItem("CARGO_USUARIO");
const btnTec = document.getElementById("btn_tec");
const btnCon = document.getElementById("btn_con");

if (cargo == "eficiencia") {
  btnCon.style.display = "none";
} else if (cargo == "consumo") {
  btnTec.style.display = "none";
}

// Função que troca as telas da dashboard

function trocarDash(index) {
  const dashTec = document.getElementById("dash-tec");
  const dashCon = document.getElementById("dash-con");

  if (index == 1) {
    btnTec.classList.add("ativo");
    btnCon.classList.remove("ativo");

    dashTec.style.display = "grid";
    dashCon.style.display = "none";
  } else {
    btnCon.classList.add("ativo");
    btnTec.classList.remove("ativo");

    dashCon.style.display = "grid";
    dashTec.style.display = "none";
  }
}

// Dashboard Status

const graficoEnergiaAtrasada = document.getElementById("graph_ener_atr");

new Chart(graficoEnergiaAtrasada, {
  type: "bar",
  data: {
    labels: [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ],
    datasets: [
      {
        label: "Potência Reativa Adiantada (kVarh)",
        data: [50, 60, 55, 70, 65, 55, 60],
        borderWidth: 1,
        borderColor: "#22AF2F",
        backgroundColor: "#22AF2F77",
        yAxisID: "y1",
        order: 2,
      },
      {
        label: "Fator de Potência Adiantada",
        data: [0.85, 0.87, 0.83, 0.86, 0.84, 0.82, 0.88],
        type: "line",
        borderColor: "#E0841F",
        backgroundColor: "#E0841F77",
        fill: false,
        yAxisID: "y2",
        order: 1,
      },
    ],
  },
  options: {
    scales: {
      y1: {
        beginAtZero: true,
        position: "left",
        grid: { display: false },
      },
      y2: {
        beginAtZero: true,
        max: 1,
        position: "right",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  },
});

const graficoEnergiaAdiantada = document.getElementById("graph_ener_adi");

new Chart(graficoEnergiaAdiantada, {
  type: "bar",
  data: {
    labels: [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ],
    datasets: [
      {
        label: "Potência Reativa Atrasado (kVarh)",
        data: [43, 57, 51, 52, 32, 57, 65],
        borderWidth: 1,
        borderColor: "#3B4FEB",
        backgroundColor: "#3B4FEB77",
        yAxisID: "y1",
        order: 2,
      },
      {
        label: "Fator de Potência Atrasado",
        data: [0.9, 0.21, 0.83, 0.56, 0.3, 0.87, 0.85],
        type: "line",
        borderColor: "#DBB100",
        backgroundColor: "#DBB10077",
        fill: false,
        yAxisID: "y2",
        order: 1,
      },
    ],
  },
  options: {
    scales: {
      y1: {
        beginAtZero: true,
        position: "left",
        grid: { display: false },
      },
      y2: {
        beginAtZero: true,
        max: 1,
        position: "right",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  },
});

const graficoUtilIndutiva = document.getElementById("graph_util_indutiva");

new Chart(graficoUtilIndutiva, {
  type: "bar",
  data: {
    labels: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    datasets: [
      {
        label: "Energia Útil",
        data: [12, 19, 3, 5, 2, 3, 5],
        borderWidth: 1,
      },
      {
        label: "Energia Indutiva",
        data: [7, 2, 3, 14, 5, 2, 8],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Dashboard Consumo

const graficoConsumoMedia = document.getElementById("graph_con_med");

function calcularMediaMovel(data, windowSize) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (i < windowSize - 1) {
      result.push(null);
    } else {
      let sum = 0;
      for (let j = 0; j < windowSize; j++) {
        sum += data[i - j];
      }
      result.push(sum / windowSize);
    }
  }
  return result;
}

const dadosConsumo = [12, 19, 3, 5, 2, 3, 8, 12];
const mediaMovel = calcularMediaMovel(dadosConsumo, 3);

new Chart(graficoConsumoMedia, {
  type: "line",
  data: {
    labels: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    datasets: [
      {
        label: "Consumo de Energia",
        data: dadosConsumo,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Média Móvel",
        data: mediaMovel,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        borderDash: [5, 5],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const graficoEmissaoGases = document.getElementById("graph_emissao");

new Chart(graficoEmissaoGases, {
  type: "bar",
  data: {
    labels: [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ],
    datasets: [
      {
        label: "Emissão de CO₂ (tCO2)",
        data: [120, 150, 130, 160, 145, 110, 100],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 205, 86, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(201, 203, 207, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Emissão de CO₂: ${context.raw} (tCO2)`;
          },
        },
      },
    },
  },
});
