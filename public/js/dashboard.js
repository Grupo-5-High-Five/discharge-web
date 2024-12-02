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
      data: [30, 22, 31, 18, 25, 21, 23],
    },
    {
      name: "Fator de Potência",
      type: "line",
      data: [0.85, 0.87, 0.83, 0.86, 0.84, 0.82, 0.88],
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
      max: 1,
      title: { text: "Fator de Potência" },
    },
  ],
  colors: ["#5af76988", "#E0841F"],
  tooltip: { shared: true, intersect: false },
};

new ApexCharts(document.querySelector("#graph_ener_atr"), optionsEnergiaAtrasada).render();

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
      data: [43, 57, 51, 52, 32, 57, 65],
    },
    {
      name: "Fator de Potência",
      type: "line",
      data: [0.9, 0.21, 0.83, 0.56, 0.3, 0.87, 0.85],
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
      max: 1,
      title: { text: "Fator de Potência" },
    },
  ],
  colors: ["#405bf3af", "#ebc000"],
  tooltip: { shared: true, intersect: false },
};

new ApexCharts(document.querySelector("#graph_ener_adi"), optionsEnergiaAdiantada).render();

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
      data: dadosConsumo,
    },
    {
      name: "Média Móvel",
      data: [11, 14, 8, 6, 5, 4, 6, 10], // Calculada separadamente
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
// Gráfico: Emissão de Gases
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
      data: dadosConsumo,
    },
    {
      name: "Emissão",
      data: [5, 6, 3, 9, 6, 4, 6],
    },
  ],
  xaxis: {
    categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  },
  colors: ["#4BC0C0", "#DBB100"],
};

var chart = new ApexCharts(document.querySelector("#graph_emissao"), optionsEmissaoGases).render();

var options = {
  chart: {
    type: "line",
  },
  series: [
    {
      name: "sales",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ],
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
};
