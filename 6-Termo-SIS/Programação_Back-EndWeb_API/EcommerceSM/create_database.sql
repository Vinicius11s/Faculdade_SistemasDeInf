-- Script para criar o banco de dados dbEccomerceSM
USE master;
GO

-- Verificar se o banco já existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'dbEccomerceSM')
BEGIN
    CREATE DATABASE dbEccomerceSM;
    PRINT 'Banco de dados dbEccomerceSM criado com sucesso!';
END
ELSE
BEGIN
    PRINT 'Banco de dados dbEccomerceSM já existe.';
END
GO

-- Usar o banco criado
USE dbEccomerceSM;
GO

-- Criar as tabelas básicas baseadas nas entidades
CREATE TABLE Categorias (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Descricao nvarchar(100) NOT NULL
);

CREATE TABLE Clientes (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Nome nvarchar(100) NOT NULL,
    CPF nvarchar(14) NOT NULL,
    Endereco nvarchar(150) NOT NULL
);

CREATE TABLE FormaPagamentos (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Descricao nvarchar(50) NOT NULL
);

CREATE TABLE Usuarios (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Login nvarchar(50) NOT NULL,
    Senha nvarchar(50) NOT NULL
);

CREATE TABLE Produtos (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Nome nvarchar(50) NOT NULL,
    Descricao nvarchar(150) NOT NULL,
    Valor decimal(18,2) DEFAULT 0,
    UnidadeCompra nvarchar(10),
    Estoque decimal(18,3) DEFAULT 0,
    IdCategoria int NOT NULL,
    FOREIGN KEY (IdCategoria) REFERENCES Categorias(Id)
);

CREATE TABLE Pedidos (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Data datetime2 NOT NULL,
    Status nvarchar(50) NOT NULL,
    Descricao nvarchar(500),
    IdCliente int NOT NULL,
    IdFormaPagamento int NOT NULL,
    FOREIGN KEY (IdCliente) REFERENCES Clientes(Id),
    FOREIGN KEY (IdFormaPagamento) REFERENCES FormaPagamentos(Id)
);

CREATE TABLE ProdutoPedidos (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Quantidade decimal(18,3) NOT NULL,
    ValorUnitario decimal(18,2) DEFAULT 0,
    IdPedido int NOT NULL,
    IdProduto int NOT NULL,
    FOREIGN KEY (IdPedido) REFERENCES Pedidos(Id) ON DELETE CASCADE,
    FOREIGN KEY (IdProduto) REFERENCES Produtos(Id)
);

PRINT 'Tabelas criadas com sucesso!';
GO
