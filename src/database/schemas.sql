DROP DATABASE IF EXISTS discharge;
CREATE DATABASE IF NOT EXISTS discharge;
USE discharge;

CREATE TABLE IF NOT EXISTS empresa (
    id                                  INT                 AUTO_INCREMENT                      COMMENT 'Identificador único da empresa', 
    nome_fantasia                       VARCHAR(45)         NOT NULL                            COMMENT 'Nome fantasia da empresa',
    email                               VARCHAR(345)        NOT NULL UNIQUE                     COMMENT 'Email da empresa, deve ser único',
    telefone                            VARCHAR(15)         NOT NULL                            COMMENT 'Telefone de contato da empresa',
    cnpj                                CHAR(14)            NOT NULL UNIQUE                     COMMENT 'CNPJ da empresa, deve ser único',
    cep                                 CHAR(8)             NOT NULL                            COMMENT 'CEP da empresa',
    status_empresa                      VARCHAR(7)          DEFAULT 'ativo'                     COMMENT 'Status da empresa',
    PRIMARY KEY (id)
) COMMENT 'Tabela que armazena informações de Empresas';

CREATE TABLE IF NOT EXISTS funcionario (
    id                                  INT                 AUTO_INCREMENT                      COMMENT 'Identificador único do funcionário',
    nome                                VARCHAR(50)         NOT NULL                            COMMENT 'Nome do funcionário', 
    email                               VARCHAR(345)        NOT NULL UNIQUE                     COMMENT 'Email do funcionário, deve ser único',
    cpf                                 CHAR(11)            NOT NULL UNIQUE                     COMMENT 'CPF do funcionário, deve ser único',
    cargo                               VARCHAR(11)         NOT NULL DEFAULT "admin"            COMMENT 'Tipo de funcionário (admin, eficiencia, consumo), para permissionamentos',
    senha                               VARCHAR(16)         NOT NULL                            COMMENT 'Senha do funcionário, com limite de 16 caracteres',
    status_funcionario                  VARCHAR(7)          DEFAULT 'ativo'                     COMMENT 'Status do funcionário',
    fkempresa                           INT                                                     COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
    CONSTRAINT chk_cargo CHECK(cargo IN ("admin", "eletricista", "financeiro")),
    PRIMARY KEY (id, fkempresa),
    FOREIGN KEY ForeignKey_fkEmpresa (fkempresa) REFERENCES empresa (id)
) COMMENT 'Tabela que armazena informações de Funcionários';

CREATE TABLE IF NOT EXISTS leitura (
    id                                  INT                 AUTO_INCREMENT                      COMMENT 'Identificador único da leitura',
    dt                                  DATETIME            NOT NULL                            COMMENT 'Data e horário da leitura',
    consumo                             DECIMAL(6,3)        NOT NULL                            COMMENT 'Valor do consumo de energia da metálurgica',
    potencia_reativa_atrasada           DECIMAL(6,3)        NOT NULL                            COMMENT 'Valor de potência reativa atrasada em kVarh',
    potencia_reativa_adiantada          DECIMAL(6,3)        NOT NULL                            COMMENT 'Valor de potência reativa adiantada em kVarh',
    emissao                             DECIMAL(6,3)        NOT NULL                            COMMENT 'Valor da emissão de gases CO2',
    fator_potencia_atrasado             DECIMAL(6,3)        NOT NULL                            COMMENT 'Fator de potência atrasada',
    fator_potencia_adiantado            DECIMAL(6,3)        NOT NULL                            COMMENT 'Fator de potência adiantada',
    status_semana                       VARCHAR(255)        NOT NULL                            COMMENT 'Informativo do dia, Dia de Semana ou Final de semana',
    dia_semana                          VARCHAR(255)        NOT NULL                            COMMENT 'Dia da semana que foi realizado a leitura',
    fkempresa                           INT                 NOT NULL                            COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
    PRIMARY KEY (id),
    FOREIGN KEY ForeignKey_fkEmpresa (fkempresa) REFERENCES empresa (id)
) COMMENT 'Tabela que armazena as leituras de dados de cada empresa';

CREATE TABLE IF NOT EXISTS historico_mensagens(
    id                                  INT                 AUTO_INCREMENT                      COMMENT 'Identificador único do histórico de mensagens',
    mensagem                            VARCHAR(200)                                            COMMENT 'Mensagem de sugestão de cada empresa',
    data_hora                           DATETIME                                                COMMENT 'Data e hora de quando foi enviado a mensagem/sugestão',
    fkempresa                           INT                 NOT NULL                            COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
    PRIMARY KEY (id),
    FOREIGN KEY ForeignKey_fkEmpresa (fkempresa) REFERENCES empresa (id)
) COMMENT 'Tabela que armazena o histórico de mensagens da empresa';

CREATE TABLE IF NOT EXISTS metrica (
    id 											INT 			AUTO_INCREMENT 					COMMENT 'Identificador único de métricas de cada empresa',    
    co2_maximo_anual 							FLOAT 			       							COMMENT 'Métrica de CO2 máxima antes do alerta',
    consumo_maximo_mensal 						FLOAT			     							COMMENT 'Métrica de Consumo máximo antes do alerta',
    potencia_reativa_atrasada_maxima_semanal 	FLOAT 			 								COMMENT 'Potência Reativa Atrasada máxima semanal antes do alerta',
    potencia_reativa_adiantada_maxima_semanal 	FLOAT 			 								COMMENT 'Potência Reativa Adiantada máxima semanal antes do alerta',
    fator_potencia_atrasado_maxima_diario		FLOAT 			 								COMMENT 'Fator de Potência Reativo Atrasado máximo diário antes do alerta',
    fator_potencia_adiantado_maxima_diario 		FLOAT 			 								COMMENT 'Fator de Potência Reativo Adiantado máximo diário antes do alerta',
    fkempresa 									INT 			 								COMMENT 'Chave estrangeira para a empresa',
    PRIMARY KEY (id),
    CONSTRAINT ForeignKey_fkEmpresa  FOREIGN KEY (fkempresa) REFERENCES empresa (id)
) COMMENT = 'Tabela que armazena as métricas de cada empresa';


CREATE TABLE IF NOT EXISTS tokens_recuperacao (
    id                                  INT                 AUTO_INCREMENT                      COMMENT 'Identificador único de métricas de cada token',
    email                               VARCHAR(255)        NOT NULL UNIQUE                     COMMENT 'Email do funcionário que solicitou a troca de senha',
    token                               VARCHAR(64)         NOT NULL                            COMMENT 'Token para permissionamento de trocar senha',
    data_criacao                        DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT 'Data de criação do token',
    data_expiracao                      DATETIME            NOT NULL                            COMMENT 'Data de expiração do token',
    PRIMARY KEY (id)
) COMMENT 'Tabela que armazena tokens para trocar senha do Funcionário';

CREATE TABLE IF NOT EXISTS anotacoes (
    id                                  INT                 AUTO_INCREMENT                      COMMENT 'Identificardor único das anotações',
    texto                               VARCHAR(255)        NOT NULL                            COMMENT 'Texto na anotação feita pelo usuário',
    fkfuncionario                       INT                 NOT NULL                            COMMENT 'Chave estrangeira que referencia o funcionário que realizou a anotação',
    fkempresa                           INT                 NULL                                COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
    PRIMARY KEY (id),
    FOREIGN KEY ForeignKey_fkEmpresa (fkempresa) REFERENCES empresa (id),
    FOREIGN KEY ForeignKey_fkFuncionario (fkfuncionario) REFERENCES funcionario (id)
) COMMENT 'Tabela que armazena as anotações realizadas pelos funcionários de determinada empresa';

DELIMITER $$

CREATE TRIGGER after_empresa_insert
AFTER INSERT ON empresa
FOR EACH ROW
BEGIN
    -- Inserir métricas padrão para a nova empresa
    INSERT INTO metrica (
        co2_maximo_anual,
        consumo_maximo_mensal,
        potencia_reativa_atrasada_maxima_semanal,
        potencia_reativa_adiantada_maxima_semanal,
        fator_potencia_atrasado_maxima_diario,
        fator_potencia_adiantado_maxima_diario,
        fkempresa
    ) VALUES (
        0,  
        0, 
        0,  
        0,  
        0,     
        0,     
        NEW.id      
    );
END$$

DELIMITER ;


-- Inserir empresa SteelForge
INSERT INTO empresa (nome_fantasia, email, telefone, cnpj, cep, status_empresa)
VALUES ('SteelForge', 'contato@steelforge.com', '1234567890', '12345678000190', '12345678', 'ativo');

-- Inserir dois funcionários para a empresa SteelForge
INSERT INTO funcionario (nome, email, cpf, cargo, senha, status_funcionario, fkempresa)
VALUES ('João Pedro', 'joao.pedro@steelforge.com', '12345678910', 'eletricista', '123', 'ativo', 1),
	   ('Isaías Oliveira', 'isaias.oliveira@steelforge.com', '12745678910', 'financeiro', '123', 'ativo', 1),
	   ('Giovanna Beltrão', 'giovanna.beltrao@steelforge.com', '12355678910', 'eletricista', '123', 'ativo', 1),
	   ('Pedro Jesus', 'pedro.jesus@steelforge.com', '12345671910', 'financeiro', '123', 'ativo', 1),
       ('Gustavo Luz', 'gustavo.luz@steelforge.com', '98765432100', 'admin', '123', 'ativo', 1);