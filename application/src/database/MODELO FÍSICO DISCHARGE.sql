DROP DATABASE IF EXISTS discharge;
CREATE DATABASE IF NOT EXISTS discharge;
USE discharge;

CREATE TABLE IF NOT EXISTS empresa (
idEmpresa 		INT 			AUTO_INCREMENT COMMENT 'Identificador único da empresa', 
nome_fantasia 	VARCHAR(45) 	NOT NULL COMMENT 'Nome fantasia da empresa',
email 			VARCHAR(345) 	NOT NULL UNIQUE COMMENT 'Email da empresa, deve ser único',
telefone 		VARCHAR(15) 	NOT NULL COMMENT 'Telefone de contato da empresa',
cnpj 			CHAR(18) 		NOT NULL UNIQUE COMMENT 'CNPJ da empresa, deve ser único',
cep 			CHAR(9) 		NOT NULL COMMENT 'CEP da empresa',

PRIMARY KEY PK_idEmpresa (idEmpresa)
) COMMENT 'Tabela que armazena informações de Empresas';

CREATE TABLE IF NOT EXISTS funcionario (
idFuncionario INT 	NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do funcionário',
nome VARCHAR(50) 	NOT NULL COMMENT 'Nome do funcionário', 
email VARCHAR(345) 	NOT NULL UNIQUE COMMENT 'Email do funcionário, deve ser único',
cpf CHAR(12) 		NOT NULL UNIQUE COMMENT 'CPF do funcionário, deve ser único',
cargo VARCHAR(11) 	NOT NULL DEFAULT "funcionario" COMMENT 'Tipo de funcionário (superior ou funcionario), para permissionamentos',
senha VARCHAR(16) 	NOT NULL COMMENT 'Senha do funcionário, com limite de 16 caracteres',
fkEmpresa INT COMMENT 'Chave estrangeira que referencia a empresa à qual o funcionário pertence',

CONSTRAINT chk_cargo CHECK(cargo IN ("gerente", "funcionario")),
PRIMARY KEY PK_idFuncionario (idFuncionario, fkEmpresa),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (idEmpresa)
) COMMENT 'Tabela que armazena informações de Funcionários';