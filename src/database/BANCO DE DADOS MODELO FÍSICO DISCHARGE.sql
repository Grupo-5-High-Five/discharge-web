-- DROP DATABASE IF EXISTS discharge;
CREATE DATABASE IF NOT EXISTS discharge;

USE discharge;

CREATE TABLE
    IF NOT EXISTS empresa (
        idEmpresa INT AUTO_INCREMENT COMMENT 'Identificador único da empresa',
        nome_fantasia VARCHAR(45) NOT NULL COMMENT 'Nome fantasia da empresa',
        email VARCHAR(345) NOT NULL UNIQUE COMMENT 'Email da empresa, deve ser único',
        telefone VARCHAR(15) NOT NULL COMMENT 'Telefone de contato da empresa',
        cnpj CHAR(18) NOT NULL UNIQUE COMMENT 'CNPJ da empresa, deve ser único',
        cep CHAR(9) NOT NULL COMMENT 'CEP da empresa',
        statusEmpresa VARCHAR(7) DEFAULT 'ativo' COMMENT 'Status da empresa',
        PRIMARY KEY PK_idEmpresa (idEmpresa)
    ) COMMENT 'Tabela que armazena informações de Empresas';

CREATE TABLE
    IF NOT EXISTS funcionario (
        idFuncionario INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do funcionário',
        nome VARCHAR(50) NOT NULL COMMENT 'Nome do funcionário',
        email VARCHAR(345) NOT NULL UNIQUE COMMENT 'Email do funcionário, deve ser único',
        cpf CHAR(12) NOT NULL UNIQUE COMMENT 'CPF do funcionário, deve ser único',
        cargo VARCHAR(11) NOT NULL DEFAULT "funcionario" COMMENT 'Tipo de funcionário (superior ou funcionario), para permissionamentos',
        senha VARCHAR(16) NOT NULL COMMENT 'Senha do funcionário, com limite de 16 caracteres',
        statusFuncionario VARCHAR(7) DEFAULT 'ativo' COMMENT 'Status do funcionário',
        fkEmpresa INT COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
        CONSTRAINT chk_cargo CHECK (cargo IN ("gerente", "funcionario")),
        PRIMARY KEY PK_idFuncionario (idFuncionario, fkEmpresa),
        FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
    ) COMMENT 'Tabela que armazena informações de Funcionários';

CREATE TABLE
    IF NOT EXISTS leitura (
        idLeitura INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador único da leitura',
        data DATETIME NOT NULL COMMENT 'Data e horário da leitura',
        consumo DECIMAL(6, 3) NOT NULL COMMENT 'Valor do consumo de energia da metálurgica',
        potenciaReativaAtrasada DECIMAL(6, 3) NOT NULL COMMENT 'Valor de potência reativa atrasada em kVarh',
        potenciaReativaAdiantada DECIMAL(6, 3) NOT NULL COMMENT 'Valor de potência reativa adiantada em kVarh',
        emissao DECIMAL(6, 3) NOT NULL COMMENT 'Valor da emissão de gases CO2',
        fatorPotenciaAtrasado DECIMAL(6, 3) NOT NULL COMMENT 'Fator de potência atrasada',
        fatorPotenciaAdiantado DECIMAL(6, 3) NOT NULL COMMENT 'Fator de potência adiantada',
        statusSemana VARCHAR(255) NOT NULL COMMENT 'Informativo do dia, Dia de Semana ou Final de semana',
        diaSemana VARCHAR(255) NOT NULL COMMENT 'Dia da semana que foi realizado a leitura',
        fkEmpresa INT NOT NULL COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
        PRIMARY KEY (idLeitura),
        FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
    ) COMMENT 'Tabela que armazena as leituras de dados de cada empresa';

CREATE TABLE
    IF NOT EXISTS historicoMensagens (
        idHistorico INT AUTO_INCREMENT COMMENT 'Identificador único do histórico de mensagens',
        mensagem VARCHAR(200) COMMENT 'Mensagem de sugestão de cada empresa',
        dataHora DATETIME COMMENT 'Data e hora de quando foi enviado a mensagem/sugestão',
        fkEmpresa INT NOT NULL COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
        PRIMARY KEY (idHistorico),
        FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
    ) COMMENT 'Tabela que armazena o histórico de mensagens da empresa';

CREATE TABLE
    IF NOT EXISTS metrica (
        idMetricas INT AUTO_INCREMENT COMMENT 'Identificador único de métricas de cada empresa',
        energiaMaxima VARCHAR(45) COMMENT 'Métrica de energia máxima antes do alerta',
        co2Maximo VARCHAR(45) COMMENT 'Métrica de CO2 máxima antes do alerta',
        fkEmpresa INT NOT NULL COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
        PRIMARY KEY (idMetricas),
        FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
    ) COMMENT 'Tabela que armazena o métricas de cada empresa';

CREATE TABLE
    tokens_recuperacao (
        idToken INT AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        token VARCHAR(64) NOT NULL,
        data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        data_expiracao DATETIME NOT NULL,
        PRIMARY KEY (idToken)
    );