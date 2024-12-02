var database = require("../database/config");

function listar(fkempresa) {
  var instrucaoSql = `

-- Média das emissões (todos os meses)
SELECT 
	ROUND(AVG(emissao_mensal), 3) AS media_emissao
FROM
    (SELECT 
        DATE_FORMAT(dt, '%Y-%m') AS mes,
            SUM(emissao) AS emissao_mensal
    FROM
        leitura
        WHERE fkempresa = 1
    GROUP BY DATE_FORMAT(dt, '%Y-%m')
    ORDER BY mes) AS soma_dos_ultimos_meses

UNION

-- Emissão de tCO2(ano atual)
SELECT 
    ROUND(SUM(emissao), 3) emissao_ano
FROM
    leitura
WHERE
    DATE_FORMAT(dt, '%Y') = (SELECT 
            MAX(DATE_FORMAT(dt, '%Y')) ano
        FROM
            leitura
        ORDER BY ano)

UNION
                                
-- Meta de emissão (metricaAnual / 100 * (emissão de tCO2 ano atual))

SELECT 
    ROUND((metricaAnual / 100) * emissao_atual, 3) AS meta_emissao
FROM
    (SELECT 
        YEAR(dt) AS ano,
            SUM(emissao) AS emissao_atual,
            (SELECT 
                    co2_maximo_anual
                FROM
                    metrica where fkempresa = 1) AS metricaAnual
    FROM
        leitura
    WHERE
        YEAR(dt) = (SELECT MAX(YEAR(dt)) FROM leitura)
    GROUP BY YEAR(dt)) AS emissoes_anuais

UNION

-- Média mensal do consumo (todos os meses)
SELECT 
    ROUND(AVG(consumo_mensal), 3) AS media_consumo
FROM (
    SELECT 
        DATE_FORMAT(dt, '%Y-%m') AS mes,
        SUM(consumo) AS consumo_mensal
    FROM 
        leitura
    GROUP BY 
        DATE_FORMAT(dt, '%Y-%m')
    ORDER BY 
        mes
) AS soma_dos_ultimos_meses

UNION

-- Consumo mes atual(mes atual)
SELECT 
    ROUND(SUM(consumo), 3) consumo_ano
FROM
    leitura
WHERE
    DATE_FORMAT(dt, '%Y') = (SELECT 
            MAX(DATE_FORMAT(dt, '%Y')) ano
        FROM
            leitura
        ORDER BY ano)

UNION
                                
-- Meta de consumo (metricaAnual / 100 * (Consumo de energia mes atual))
SELECT 
    meta_consumo
FROM (
    SELECT 
        ROUND((SUM(l.consumo) / m.consumo_maximo_mensal) * 100, 3) AS meta_consumo
    FROM 
        leitura l
    JOIN 
        empresa e ON e.id = l.fkempresa
    JOIN 
        metrica m ON e.id = m.fkempresa
    GROUP BY 
        DATE_FORMAT(l.dt, '%Y-%m'), m.consumo_maximo_mensal
    ORDER BY 
        DATE_FORMAT(l.dt, '%Y-%m') DESC
    LIMIT 1
) AS ultima_meta_consumo;
    `;
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
};
