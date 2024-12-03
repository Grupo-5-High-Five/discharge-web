var database = require("../database/config");

function listarVisaoEnergetica(fkempresa) {
  var instrucaoSql = `
SELECT 
    -- Média das emissões (todos os meses)
    (SELECT 
        ROUND(AVG(emissao_mensal), 3)
     FROM (
        SELECT 
            DATE_FORMAT(dt, '%Y-%m') AS mes,
            SUM(emissao) AS emissao_mensal
        FROM 
            leitura
        WHERE 
            fkempresa = ?
        GROUP BY 
            DATE_FORMAT(dt, '%Y-%m')
     ) AS soma_dos_ultimos_meses) AS media_emissao,

    -- Emissão de tCO2 (ano atual)
    (SELECT 
        ROUND(SUM(emissao), 3)
     FROM 
        leitura
     WHERE 
        fkempresa = ?
        AND DATE_FORMAT(dt, '%Y') = (
            SELECT 
                MAX(DATE_FORMAT(dt, '%Y'))
            FROM 
                leitura
            WHERE 
                fkempresa = ?
        )) AS emissao_ano,

    -- Meta de emissão (metricaAnual / 100 * emissão de tCO2 ano atual)
    IFNULL(
        (SELECT 
            ROUND((emissao_atual / metricaAnual) * 100, 3)
         FROM (
            SELECT 
                SUM(emissao) AS emissao_atual,
                (SELECT 
                    co2_maximo_anual
                 FROM 
                    metrica 
                 WHERE 
                    fkempresa = ?) AS metricaAnual
            FROM 
                leitura
            WHERE 
                fkempresa = ?
                AND YEAR(dt) = (SELECT MAX(YEAR(dt)) FROM leitura WHERE fkempresa = ?)
         ) AS emissoes_anuais),
        0
    ) AS meta_emissao,

    -- Média mensal do consumo (todos os meses)
    (SELECT 
        ROUND(AVG(consumo_mensal), 3)
     FROM (
        SELECT 
            DATE_FORMAT(dt, '%Y-%m') AS mes,
            SUM(consumo) AS consumo_mensal
        FROM 
            leitura
        WHERE 
            fkempresa = ?
        GROUP BY 
            DATE_FORMAT(dt, '%Y-%m')
     ) AS soma_dos_ultimos_meses) AS media_consumo,

    -- Consumo do mês atual
    (SELECT 
        ROUND(SUM(consumo), 3)
     FROM 
        leitura
     WHERE 
        fkempresa = ?
        AND DATE_FORMAT(dt, '%Y') = (
            SELECT 
                MAX(DATE_FORMAT(dt, '%Y'))
            FROM 
                leitura
            WHERE 
                fkempresa = ?
        )) AS consumo_ano,

    -- Meta de consumo (metricaAnual / 100 * Consumo de energia mês atual)
    IFNULL(
        (SELECT 
            ROUND((SUM(l.consumo) / m.consumo_maximo_mensal) * 100, 3)
         FROM 
            leitura l
         JOIN 
            empresa e ON e.id = l.fkempresa
         JOIN 
            metrica m ON e.id = m.fkempresa
         WHERE 
            l.fkempresa = ?
         GROUP BY 
            DATE_FORMAT(l.dt, '%Y-%m'), m.consumo_maximo_mensal
         ORDER BY 
            DATE_FORMAT(l.dt, '%Y-%m') DESC
         LIMIT 1), 
        0
    ) AS meta_consumo;
      `;
  return database.executar(instrucaoSql, [fkempresa, fkempresa, fkempresa, fkempresa, fkempresa, fkempresa, fkempresa, fkempresa, fkempresa, fkempresa]);
}

function listarGraphTendencia(fkempresa) {
  var instrucaoSql = `
          SELECT 
              l1.mes,
              l1.ano AS ano_atual,
              COALESCE(l1.consumo_total, 0) AS consumo_atual,
              l2.ano AS ano_passado,
              COALESCE(l2.consumo_total, 0) AS consumo_passado
          FROM (
              SELECT 
                  YEAR(dt) AS ano,
                  MONTH(dt) AS mes,
                  SUM(consumo) AS consumo_total
              FROM 
                  leitura
              WHERE 
                  fkempresa = ?
                  AND YEAR(dt) = (SELECT DATE_FORMAT(MAX(dt), '%Y') FROM leitura WHERE fkempresa = ?)
              GROUP BY 
                  YEAR(dt), MONTH(dt)
          ) l1
          LEFT JOIN (
              SELECT 
                  YEAR(dt) AS ano,
                  MONTH(dt) AS mes,
                  SUM(consumo) AS consumo_total
              FROM 
                  leitura
              WHERE 
                  fkempresa = ?
                  AND YEAR(dt) = (SELECT DATE_FORMAT(MAX(dt), '%Y') FROM leitura WHERE fkempresa = ?) - 1
              GROUP BY 
                  YEAR(dt), MONTH(dt)
          ) l2
          ON l1.mes = l2.mes;
        `;
  return database.executar(instrucaoSql, [fkempresa, fkempresa, fkempresa, fkempresa]);
}

function listarGraphAtrasado(fkempresa) {
  var instrucaoSql = `
    SELECT 
        DATE(dt) AS dia, -- Agrupamento diário
        SUM(COALESCE(potencia_reativa_atrasada, 0)) AS potencia_reativa_atrasada,
        AVG(COALESCE(fator_potencia_atrasado, 0)) AS fator_potencia_total
    FROM 
        leitura
    WHERE fkempresa = ? and
        COALESCE(potencia_reativa_atrasada, 0) + COALESCE(potencia_reativa_adiantada, 0) > 0
    GROUP BY 
        DATE(dt) -- Agrupa por data
    ORDER BY 
        dia desc limit 7;
        `;
  return database.executar(instrucaoSql, [fkempresa]);
}

function listarGraphAdiantado(fkempresa) {
  var instrucaoSql = `
    SELECT 
        DATE(dt) AS dia, -- Agrupamento diário
        SUM(COALESCE(potencia_reativa_adiantada, 0)) AS potencia_reativa_adiantada,
        AVG(COALESCE(fator_potencia_atrasado, 0)) AS fator_potencia_total
    FROM 
        leitura
    WHERE fkempresa = ? and
        COALESCE(potencia_reativa_atrasada, 0) + COALESCE(potencia_reativa_adiantada, 0) > 0
    GROUP BY 
        DATE(dt) -- Agrupa por data
    ORDER BY 
        dia desc limit 7;
        `;
  return database.executar(instrucaoSql, [fkempresa]);
}

function listarGraphConsumo(fkempresa) {
  var instrucaoSql = `
    WITH 
    consumo_diario AS (
        SELECT 
            DATE(dt) AS data,
            SUM(consumo) AS consumo_diario
        FROM 
            leitura
        WHERE 
            fkempresa = ? -- Filtrar pela empresa
        GROUP BY 
            DATE(dt)
    ),
    previsao_consumo AS (
        SELECT 
            c1.data,
            AVG(c2.consumo_diario) AS previsao_consumo_proximo_dia
        FROM 
            consumo_diario c1
        JOIN 
            consumo_diario c2
        ON 
            c2.data BETWEEN DATE_SUB(c1.data, INTERVAL 3 DAY) AND DATE_SUB(c1.data, INTERVAL 1 DAY)
        GROUP BY 
            c1.data
            )
        SELECT 
            c.data,
            c.consumo_diario AS consumo_ultimos_7_dias,
            p.previsao_consumo_proximo_dia
        FROM 
            consumo_diario c
        LEFT JOIN 
            previsao_consumo p
        ON 
            c.data = p.data
        ORDER BY 
            c.data DESC
        LIMIT 7;
          `;
  return database.executar(instrucaoSql, [fkempresa]);
}

function listarQualidade(fkempresa) {
  var instrucaoSql = `
  SELECT 
    -- Emissão tCO2 semana atual
    (SELECT 
        SUM(emissao_tco2_ultimos_7_dias)
    FROM (
        SELECT 
            DATE(dt),
            SUM(emissao) AS emissao_tco2_ultimos_7_dias
        FROM 
            leitura
        WHERE 
            fkempresa = ?
        GROUP BY 
            DATE(dt)
        ORDER BY 
            DATE(dt) DESC
        LIMIT 7
    ) AS ultima_semana) AS emissao_tco2_ultimos_7_dias,

    -- Previsão de Emissão tCO2 para a próxima semana (média das últimas 3 semanas)
    (SELECT 
        AVG(emissao_tco2)
    FROM (
        SELECT 
            SUM(emissao) AS emissao_tco2
        FROM 
            leitura
        WHERE 
            fkempresa = ?
            AND dt >= (SELECT MAX(dt) FROM leitura WHERE fkempresa = ?) - INTERVAL 21 DAY
        GROUP BY 
            YEARWEEK(dt)
        ORDER BY 
            YEARWEEK(dt) DESC
        LIMIT 3
    ) AS ultimas_3_semanas) AS previsao_emissao_proxima_semana,

    -- Consumo energia semana atual
    (SELECT 
        SUM(consumo_ultimos_7_dias)
    FROM (
        SELECT 
            DATE(dt),
            SUM(consumo) AS consumo_ultimos_7_dias
        FROM 
            leitura
        WHERE 
            fkempresa = ?
        GROUP BY 
            DATE(dt)
        ORDER BY 
            DATE(dt) DESC
        LIMIT 7
    ) AS ultima_semana) AS consumo_ultimos_7_dias,

    -- Previsão Consumo energia próxima semana (últimas 3 semanas / 3)
    (SELECT 
        AVG(consumo_energia)
    FROM (
        SELECT 
            SUM(consumo) AS consumo_energia
        FROM 
            leitura
        WHERE 
            fkempresa = ?
            AND dt >= (SELECT MAX(dt) FROM leitura WHERE fkempresa = ?) - INTERVAL 21 DAY
        GROUP BY 
            YEARWEEK(dt)
        ORDER BY 
            YEARWEEK(dt) DESC
        LIMIT 3
    ) AS ultimas_3_semanas) AS previsao_consumo_proxima_semana,

    -- Potência Reativa Adiantada na semana atual (kVar)
    (SELECT 
        SUM(potencia_reativa_adiantada_ultimos_7_dias)
    FROM (
        SELECT 
            DATE(dt),
            SUM(potencia_reativa_adiantada) AS potencia_reativa_adiantada_ultimos_7_dias
        FROM 
            leitura
        WHERE 
            fkempresa = ?
        GROUP BY 
            DATE(dt)
        ORDER BY 
            DATE(dt) DESC
        LIMIT 7
    ) AS ultima_semana) AS potencia_reativa_adiantada_ultimos_7_dias,

    -- Potência Reativa Atrasada na semana atual (kVar)
    (SELECT 
        SUM(potencia_reativa_atrasada_ultimos_7_dias)
    FROM (
        SELECT 
            DATE(dt),
            SUM(potencia_reativa_atrasada) AS potencia_reativa_atrasada_ultimos_7_dias
        FROM 
            leitura
        WHERE 
            fkempresa = ?
        GROUP BY 
            DATE(dt)
        ORDER BY 
            DATE(dt) DESC
        LIMIT 7
    ) AS ultima_semana) AS potencia_reativa_atrasada_ultimos_7_dias;
            `;
  return database.executar(instrucaoSql, [fkempresa, fkempresa, fkempresa, fkempresa, fkempresa, fkempresa, fkempresa, fkempresa]);
}

function listarMetricas(fkempresa) {
  var instrucaoSql = `
      -- Métricas
      SELECT 
			co2_maximo_anual as co2, 
			consumo_maximo_mensal as consumo, 
			potencia_reativa_atrasada_maxima_semanal as reativa_atrasada, 
			potencia_reativa_adiantada_maxima_semanal as reativa_adiantada, 
			fator_potencia_atrasado_maxima_diario as fator_atrasado, 
			fator_potencia_adiantado_maxima_diario as fator_adiantada 
        FROM metrica;
            `;
  return database.executar(instrucaoSql, [fkempresa, fkempresa]);
}

module.exports = {
  listarVisaoEnergetica,
  listarGraphTendencia,
  listarGraphAtrasado,
  listarGraphAdiantado,
  listarGraphConsumo,
  listarQualidade,
  listarMetricas,
};
