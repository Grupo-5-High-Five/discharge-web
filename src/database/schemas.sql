/*
DROP DATABASE IF EXISTS discharge;
CREATE DATABASE IF NOT EXISTS discharge;
USE discharge;
*/

CREATE TABLE IF NOT EXISTS empresa (
idEmpresa 				INT 			AUTO_INCREMENT COMMENT 'Identificador único da empresa', 
nome_fantasia 			VARCHAR(45) 	NOT NULL COMMENT 'Nome fantasia da empresa',
email 					VARCHAR(345) 	NOT NULL UNIQUE COMMENT 'Email da empresa, deve ser único',
telefone 				VARCHAR(15) 	NOT NULL COMMENT 'Telefone de contato da empresa',
cnpj 					CHAR(14) 		NOT NULL UNIQUE COMMENT 'CNPJ da empresa, deve ser único',
cep 					CHAR(9) 		NOT NULL COMMENT 'CEP da empresa',
statusEmpresa		    VARCHAR(7)		DEFAULT 'ativo' COMMENT 'Status da empresa',
PRIMARY KEY (idEmpresa)
) COMMENT 'Tabela que armazena informações de Empresas';

CREATE TABLE IF NOT EXISTS funcionario (
idFuncionario 		INT 	NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do funcionário',
nome 				VARCHAR(50) 	NOT NULL COMMENT 'Nome do funcionário', 
email 				VARCHAR(345) 	NOT NULL UNIQUE COMMENT 'Email do funcionário, deve ser único',
cpf 				CHAR(11) 		NOT NULL UNIQUE COMMENT 'CPF do funcionário, deve ser único',
cargo 				VARCHAR(10) 	NOT NULL DEFAULT "admin" COMMENT 'Tipo de funcionário (admin, eficiencia, consumo), para permissionamentos',
senha 				VARCHAR(16) 	NOT NULL COMMENT 'Senha do funcionário, com limite de 16 caracteres',
statusFuncionario 	VARCHAR(7)		DEFAULT 'ativo' COMMENT 'Status do funcionário',
fkEmpresa 			INT 			COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
CONSTRAINT chk_cargo CHECK(cargo IN ("admin", "eficiencia", "consumo")),
PRIMARY KEY (idFuncionario, fkEmpresa),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
) COMMENT 'Tabela que armazena informações de Funcionários';

CREATE TABLE IF NOT EXISTS leitura (
idLeitura                   INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador único da leitura',
dtLeitura                   DATETIME NOT NULL COMMENT 'Data e horário da leitura',
consumo                     DECIMAL(6,3) NOT NULL COMMENT 'Valor do consumo de energia da metálurgica',
potenciaReativaAtrasada     DECIMAL(6,3) NOT NULL COMMENT 'Valor de potência reativa atrasada em kVarh',
potenciaReativaAdiantada    DECIMAL(6,3) NOT NULL COMMENT 'Valor de potência reativa adiantada em kVarh',
emissao                     DECIMAL(6,3) NOT NULL COMMENT 'Valor da emissão de gases CO2',
fatorPotenciaAtrasado       DECIMAL(6,3) NOT NULL COMMENT 'Fator de potência atrasada',
fatorPotenciaAdiantado      DECIMAL(6,3) NOT NULL COMMENT 'Fator de potência adiantada',
statusSemana                VARCHAR(255) NOT NULL COMMENT 'Informativo do dia, Dia de Semana ou Final de semana',
diaSemana                   VARCHAR(255) NOT NULL COMMENT 'Dia da semana que foi realizado a leitura',
fkEmpresa                   INT NOT NULL COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
PRIMARY KEY (idLeitura),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
) COMMENT 'Tabela que armazena as leituras de dados de cada empresa';

CREATE TABLE IF NOT EXISTS historicoMensagens(
idHistorico			INT AUTO_INCREMENT COMMENT 'Identificador único do histórico de mensagens',
mensagem            VARCHAR(200) COMMENT 'Mensagem de sugestão de cada empresa',
dataHora			DATETIME COMMENT 'Data e hora de quando foi enviado a mensagem/sugestão',
fkEmpresa			INT NOT NULL COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
PRIMARY KEY (idHistorico),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
) COMMENT 'Tabela que armazena o histórico de mensagens da empresa';

CREATE TABLE IF NOT EXISTS metrica (
idMetricas			            INT AUTO_INCREMENT COMMENT 'Identificador único de métricas de cada empresa',
consumoMaxima		            VARCHAR(45) COMMENT 'Métrica de Consumo máxima antes do alerta',
co2Maximo			            VARCHAR(45) COMMENT 'Métrica de CO2 máxima antes do alerta',
potenciaReativaAtrasadaMaxima   VARCHAR(45) COMMENT 'Métrica de Potência Reativa Atrasada máxima antes do alerta',
potenciaReativaAdiantadaMaxima  VARCHAR(45) COMMENT 'Métrica de Potência Reativa Adiantada máxima antes do alerta',
fkEmpresa			            INT NOT NULL COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
PRIMARY KEY (idMetricas),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
) COMMENT 'Tabela que armazena o métricas de cada empresa';

CREATE TABLE IF NOT EXISTS tokens_recuperacao (
idToken         INT AUTO_INCREMENT COMMENT 'Identificador único de métricas de cada token',
email           VARCHAR(255) NOT NULL UNIQUE COMMENT 'Email do funcionário que solicitou a troca de senha',
token           VARCHAR(64) NOT NULL COMMENT 'Token para permissionamento de trocar senha',
data_criacao    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de criação do token',
data_expiracao  DATETIME NOT NULL COMMENT 'Data de expiração do token',
PRIMARY KEY (idToken)
) COMMENT 'Tabela que armazena tokens para trocar senha do Funcionário';

CREATE TABLE IF NOT EXISTS anotacoes (
idAnotacao      INT AUTO_INCREMENT COMMENT 'Identificardor único das anotações',
titulo          VARCHAR(45) NOT NULL COMMENT 'Título da anotação feita pelo usuário',
textoAnotacao   VARCHAR(255) NOT NULL COMMENT 'Texto na anotação feita pelo usuário',
fkFuncionario   INT NOT NULL COMMENT 'Chave estrangeira que referencia o funcionário que realizou a anotação',
fkEmpresa       INT NULL COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',
PRIMARY KEY (idAnotacao),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa),
FOREIGN KEY ForeignKey_fkFuncionario (fkFuncionario) REFERENCES funcionario (idFuncionario)
) COMMENT 'Tabela que armazena as anotações realizadas pelos funcionários de determinada empresa';

-- Inserir empresa SteelForge
INSERT INTO empresa (nome_fantasia, email, telefone, cnpj, cep, statusEmpresa)
VALUES ('SteelForge', 'contato@steelforge.com', '1234567890', '12345678000190', '12345-678', 'ativo');

-- Inserir dois funcionários para a empresa SteelForge
INSERT INTO funcionario (nome, email, cpf, cargo, senha, statusFuncionario, fkEmpresa)
VALUES ('João Silva', 'joao.silva@steelforge.com', '12345678910', 'admin', 'senha123', 'ativo', 1),
       ('Gustavo Luz', 'gustavo.luz@steelforge.com', '98765432100', 'consumo', 'senha456', 'ativo', 1);



