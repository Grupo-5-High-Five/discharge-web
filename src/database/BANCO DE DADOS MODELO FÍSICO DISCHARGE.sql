DROP DATABASE IF EXISTS discharge;
CREATE DATABASE IF NOT EXISTS discharge;
USE discharge;

CREATE TABLE IF NOT EXISTS empresa (
idEmpresa 				INT 			AUTO_INCREMENT COMMENT 'Identificador único da empresa', 
nome_fantasia 			VARCHAR(45) 	NOT NULL COMMENT 'Nome fantasia da empresa',
email 					VARCHAR(345) 	NOT NULL UNIQUE COMMENT 'Email da empresa, deve ser único',
telefone 				VARCHAR(15) 	NOT NULL COMMENT 'Telefone de contato da empresa',
cnpj 					CHAR(18) 		NOT NULL UNIQUE COMMENT 'CNPJ da empresa, deve ser único',
cep 					CHAR(9) 		NOT NULL COMMENT 'CEP da empresa',
statusEmpresa		    VARCHAR(7)		DEFAULT 'ativo' COMMENT 'Status da empresa',

PRIMARY KEY PK_idEmpresa (idEmpresa)
) COMMENT 'Tabela que armazena informações de Empresas';

CREATE TABLE IF NOT EXISTS funcionario (
idFuncionario 		INT 	NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do funcionário',
nome 				VARCHAR(50) 	NOT NULL COMMENT 'Nome do funcionário', 
email 				VARCHAR(345) 	NOT NULL UNIQUE COMMENT 'Email do funcionário, deve ser único',
cpf 				CHAR(12) 		NOT NULL UNIQUE COMMENT 'CPF do funcionário, deve ser único',
cargo 				VARCHAR(11) 	NOT NULL DEFAULT "funcionario" COMMENT 'Tipo de funcionário (superior ou funcionario), para permissionamentos',
senha 				VARCHAR(16) 	NOT NULL COMMENT 'Senha do funcionário, com limite de 16 caracteres',
statusFuncionario 	VARCHAR(7)		DEFAULT 'ativo' COMMENT 'Status do funcionário',
fkEmpresa 			INT 			COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',

CONSTRAINT chk_cargo CHECK(cargo IN ("gerente", "funcionario")),
PRIMARY KEY PK_idFuncionario (idFuncionario, fkEmpresa),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
) COMMENT 'Tabela que armazena informações de Funcionários';

CREATE TABLE IF NOT EXISTS leituras(
idLeitura							 INT AUTO_INCREMENT,
dtLeitura							 DATE,
horaLeitura							 TIME,
consumoKwh							 DECIMAL(6,3),
potenciaReativaAtrasadaKvarh		 DECIMAL(6,3),
potenciaReativaAdiantadaKvarh 		 DECIMAL(6,3),
emissaoCo2  						 DECIMAL(6,2),
fatorPotenciaAtrasado				 DECIMAL(6,3),
fatorPotenciaAdiantado				 DECIMAL(6,3),
diaSemana							 VARCHAR(12),
statusSemana						 VARCHAR(7),
fkEmpresa							 INT,

PRIMARY KEY (idLeitura),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE IF NOT EXISTS historicoMensagens(
idHistorico			INT AUTO_INCREMENT,
mensagem            VARCHAR(200),
dataHora			DATETIME,
fkEmpresa			INT,

PRIMARY KEY (idHistorico),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE IF NOT EXISTS metrica (
idMetricas			INT AUTO_INCREMENT,
energiaMaxima		VARCHAR(45),
co2Maximo			VARCHAR(45),
fkEmpresa			INT,

PRIMARY KEY (idMEtricas),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
);

INSERT INTO empresa (nome_fantasia, email, telefone, cnpj, cep) 
VALUES 
('Tech Solutions', 'contato@techsolutions.com', '11987654321', '12.345.678/0001-90', '01000-000'),
('Energy Corp', 'info@energycorp.com', '2134567890', '23.456.789/0001-91', '02000-000');

INSERT INTO funcionario (nome, email, cpf, cargo, senha, fkEmpresa) 
VALUES 
('João Silva', 'joao@techsolutions.com', '12345678900', 'gerente', 'senha123', 1),
('Maria Santos', 'maria@energycorp.com', '98765432100', 'funcionario', 'senha456', 2);

INSERT INTO leituras (dtLeitura, horaLeitura, consumoKwh, potenciaReativaAtrasadaKvarh, potenciaReativaAdiantadaKvarh, emissaoCo2, fatorPotenciaAtrasado, fatorPotenciaAdiantado, diaSemana, statusSemana, fkEmpresa) 
VALUES 
('2024-10-01', '12:00:00', 10.500, 2.300, 1.200, 5.40, 0.950, 0.980, 'Monday', 'Ativo', 1),
('2024-10-02', '14:30:00', 9.750, 2.100, 1.050, 4.90, 0.940, 0.970, 'Tuesday', 'Ativo', 2);

INSERT INTO historicoMensagens (mensagem, dataHora, fkEmpresa) 
VALUES 
('Consumo de energia elevado no mês de setembro.', '2024-09-30 10:15:00', 1),
('Relatório de emissão de CO2 disponível.', '2024-09-30 12:45:00', 2);

INSERT INTO metrica (energiaMaxima, co2Maximo, fkEmpresa) 
VALUES 
('15.000 kWh', '8.00 ton', 1),
('13.500 kWh', '7.20 ton', 2);

INSERT INTO funcionario (nome, email, cpf, cargo, senha, fkEmpresa) 
VALUES 
('carla', 'joao@te31solutions.com', '11345678900', 'gerente', 'senha1313', 1),
('Jorge', 'luzgustavo176@gmail.com', '93765432100', 'funcionario', 'senha423', 1);


select * from funcionario;
select * from metrica;