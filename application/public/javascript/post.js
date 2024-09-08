const params = new URLSearchParams(window.location.search);
const index = params.get('index')

document.addEventListener("DOMContentLoaded", () => {

  const posts = [
    {
      banner: "../../assets/solda.jpg",
      title: "Quais são os principais fatores que influenciam no alto consumo de energia em Metálurgicas?",
      content: "No Brasil, a indústria é responsável por cerca de 35% do consumo total de energia, e a metalúrgica, em particular, enfrenta grandes desafios e oportunidades para melhorar a eficiência energética. Identificar os principais fatores que contribuem para o alto consumo de energia é essencial para desenvolver estratégias eficazes de redução e promover uma operação mais sustentável e econômica. \n \n Um fator crítico é a eficiência dos equipamentos utilizados. Equipamentos antigos e obsoletos frequentemente consomem mais energia para realizar a mesma quantidade de trabalho. A substituição desses equipamentos por modelos mais modernos e eficientes, como motores de alta performance e sistemas de iluminação LED, pode resultar em economias significativas de energia. \n \n Além disso, a falta de otimização nos processos de produção contribui para o alto consumo de energia. Processos que não são adequadamente ajustados podem operar com baixa eficiência. Implementar sistemas de automação e realizar manutenção preventiva ajuda a melhorar a eficiência dos processos e reduzir o consumo energético, minimizando desperdícios e maximizando a produtividade.",
      img: "../../assets/ferreiro.jpg",
      resume: "A gestão inadequada do consumo de energia também é um fator importante. Sem monitoramento eficaz, é difícil identificar padrões de uso e ineficiências. Sistemas avançados de monitoramento e análise de dados fornecem uma visão detalhada do consumo energético, permitindo ajustes precisos e a implementação de estratégias para otimizar o uso da energia. \n \n Também, a estrutura das instalações e as práticas operacionais são muito importantes para economia de energia. Instalações mal projetadas ou com má isolação térmica podem exigir mais energia para manter condições ideais. Melhorias no design das fábricas e treinamento dos funcionários sobre práticas sustentáveis são essenciais para reduzir o consumo de energia e promover uma operação mais eficiente e econômica.",
    },
    {
      banner: "../../assets/ia.jpg",
      title: "Como a IA Pode Reduzir os Custos da Indústria Metalúrgica",
      content:
        "Em 2019, a indústria metalúrgica representou 10,9% das exportações industriais no Brasil, com uma participação de aproximadamente 3,1% no PIB industrial. Em 2021, foi o setor que mais consumiu energia elétrica no país, devido à alta demanda energética de processos como usinagem e produção de manufaturados metálicos, atividades notoriamente eletrointensivas. \n \n Segundo dados da Confederação Nacional da Indústria (CNI), de 2007 a 2020, os gastos com energia elétrica corresponderam a cerca de 6% dos custos totais do setor no Brasil, reforçando a importância desse insumo para a operação industrial.",
      img: "../../assets/int.jpg",
      resume:
        "Esse número é alarmante para CEOs de metalúrgicas, pois os custos relacionados ao consumo de energia são extremamente altos. No entanto, há uma solução para essa questão: a análise e gestão eficiente de energia. \n \n O Grupo Highfive desenvolveu o projeto Discharge, que oferece ao setor metalúrgico uma análise detalhada baseada em sugestões fornecidas por inteligência artificial. Essa tecnologia tem o potencial de gerar resultados significativos, promovendo uma redução considerável nos custos com consumo de energia, o que pode transformar o cenário do setor.",
    },
    {
      banner: "../../assets/custo.jpg",
      title: "Recomendações Inteligentes para Redução do Consumo de Energia",
      content:
        "A indústria metalúrgica, conhecida por sua alta demanda de energia elétrica, é uma das que mais sofre com os custos elevados de operação. Os processos eletrointensivos, como fundição, laminação e usinagem de metais, são fundamentais para a produção, mas o consumo energético excessivo representa um dos principais desafios para os CEOs do setor. \n \n De acordo com a Confederação Nacional da Indústria (CNI), entre 2007 e 2020, cerca de 6% dos custos totais da indústria metalúrgica no Brasil foram atribuídos ao consumo de energia elétrica. Com esse cenário, a busca por alternativas para reduzir esses gastos se torna urgente.",
      img: "../../assets/gasto.jpg",
      resume:
        "Uma solução promissora está na implementação de sistemas de gestão de energia baseados em inteligência artificial (IA) e análise de dados. Esses sistemas podem analisar padrões de consumo, identificar ineficiências e fornecer recomendações personalizadas para otimizar o uso de energia. A automação de processos também se apresenta como uma forma de reduzir desperdícios e aumentar a eficiência energética. \n \n Empresas que utilizam IA e monitoramento inteligente têm conseguido não apenas reduzir o consumo de energia, mas também melhorar a sustentabilidade e competitividade no mercado. Portanto, para os líderes da indústria metalúrgica, adotar o sistema Discharge que pode ser a chave para enfrentar os desafios dos altos custos energéticos e garantir o sucesso a longo prazo no setor.",
    },
    {
      banner: "../../assets/gases.jpg",
      title: "Gestão de Emissões de Gases sobre às Metas Governamentais",
      content:
        "A indústria metalúrgica é um dos principais setores responsáveis pelas emissões de gases poluentes, como dióxido de carbono (CO₂) e outros gases de efeito estufa, devido ao uso intensivo de combustíveis fósseis em processos como fundição e refinamento de metais. Essas emissões, além de causarem impacto ambiental, acarretam custos significativos, seja pelo desperdício de energia ou pela necessidade de se adequar a regulamentações ambientais cada vez mais rigorosas. \n \n Com a crescente pressão global para conter as mudanças climáticas, muitos governos têm estabelecido metas ambiciosas de redução de emissões de poluentes. A Contribuição Nacionalmente Determinada (NDC) do Brasil, por exemplo, comprometeu-se a reduzir as emissões de gases de efeito estufa em 37% abaixo dos níveis de 2005 até 2025, com uma meta indicativa de 43% até 2030. Essas metas colocam pressão adicional sobre o setor metalúrgico para adotar práticas sustentáveis e eficientes. \n \n Uma solução eficaz para reduzir as emissões e os custos operacionais ao mesmo tempo é a implementação de sistemas de gestão de emissões. Utilizando tecnologias avançadas, como inteligência artificial (IA) e utilizando plataformas de análise de dados, é possível identificar pontos críticos de emissão, ajustar processos e otimizar o consumo de energia, tornando as operações mais sustentáveis e eficientes.",
      img: "../../assets/forno.jpg",
      resume:
        "Para os líderes da indústria metalúrgica, atender às metas governamentais de redução de poluentes não é apenas uma obrigação legal, mas também uma oportunidade estratégica. Ao adotar tecnologias de gestão de emissões, as empresas podem reduzir seus custos operacionais, melhorar sua reputação e aumentar a competitividade no mercado global. \n \n O Discharge, surge como uma solução essencial. Com sua inteligência artificial voltada para a análise e gestão de emissões, o Discharge identifica ineficiências no consumo energético e sugere ações práticas para reduzir a quantidade de poluentes emitidos. Ao utilizar essa ferramenta, as empresas não só atenderão às rigorosas metas de redução de poluentes, como também conseguirão cortar custos relacionados ao consumo de energia e aos encargos ambientais, promovendo operações mais limpas e econômicas.",
    },
    {
      banner: "../../assets/analise.jpg",
      title: "Maximizando a Eficiência Energética Através da Análise de Dados",
      content:
        "No Brasil, o segmento industrial é responsável por aproximadamente 35% do consumo total de energia. Para as indústrias metalúrgicas, isso representa não apenas um grande custo operacional, mas também uma oportunidade significativa para melhorias de eficiência energética. A adoção de tecnologias e práticas inovadoras pode reduzir substancialmente esses custos, beneficiando tanto o meio ambiente quanto a rentabilidade das empresas. \n \n  Ao implementar sistemas avançados de monitoramento e automação, as indústrias metalúrgicas podem obter uma visão detalhada do seu consumo energético. Essa análise permite identificar padrões de uso, detectar ineficiências e prever demandas futuras, possibilitando ajustes precisos nos processos e equipamentos.",
      img: "../../assets/dashboard.jpg",
      resume:
        "A análise de dados não se limita apenas à identificação de problemas, mas também oferece insights sobre as melhores práticas e oportunidades de melhoria contínua. Com dados precisos, as empresas podem implementar mudanças que resultam em reduções significativas do consumo de energia, alinhando a operação industrial às metas de sustentabilidade e eficiência. \n \n Análise de dados com Discharge se torna essencial, é mais do que uma ferramenta – é uma estratégia integral que capacita as indústrias metalúrgicas a transformar o consumo de energia de um desafio em uma vantagem competitiva, promovendo um futuro mais sustentável e economicamente viável.",
    },
  ];

  const banner = document.getElementById("banner_post");

  const img = new Image();
  img.src = `${posts[index].banner}`;

  img.onload = function () {
    banner.style.backgroundImage = `url('${img.src}')`;

    banner.classList.add("loaded");
  };

  const titulo = document.getElementById("titulo_post");
  titulo.innerText = posts[index].title;

  const conteudo = document.getElementById("conteudo_post");
  conteudo.innerText = posts[index].content;

  const imagem = document.getElementById("imagem_post");
  imagem.src = posts[index].img;

  const resumo = document.getElementById("resumo_post");
  resumo.innerText = posts[index].resume;
});
