
-- Corrected CREATE TABLE statements for SQLite

DROP TABLE IF EXISTS produto_pedido;
DROP TABLE IF EXISTS produto;
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS endereco;
DROP TABLE IF EXISTS categoria;

CREATE TABLE categoria (
	categoria_id INTEGER PRIMARY KEY AUTOINCREMENT,
	nome_categoria TEXT,
	descricao_categoria TEXT
);

CREATE TABLE cliente (
	cliente_id INTEGER PRIMARY KEY AUTOINCREMENT,
	email TEXT,
	username TEXT,
	senha TEXT,
	nome TEXT,
	cpf TEXT NOT NULL UNIQUE,
	telefone TEXT,
	data_nascimento TEXT,
	endereco_id INTEGER NOT NULL,
	FOREIGN KEY (endereco_id) REFERENCES endereco(endereco_id)
);

CREATE TABLE endereco (
	endereco_id INTEGER PRIMARY KEY AUTOINCREMENT,
	cep TEXT,
	rua TEXT,
	bairro TEXT,
	cidade TEXT,
	numero TEXT,
	complemento TEXT,
	uf TEXT
);

CREATE TABLE pedido (
	pedido_id INTEGER PRIMARY KEY AUTOINCREMENT,
	numero_pedido INTEGER,
	valor_total_pedido REAL,
	data_pedido TEXT DEFAULT (datetime('now')),
	status INTEGER, -- INTEGER for boolean (0 = false, 1 = true)
	cliente_id INTEGER NOT NULL,
	FOREIGN KEY (cliente_id) REFERENCES cliente(cliente_id)
);

CREATE TABLE produto (
	produto_id INTEGER PRIMARY KEY AUTOINCREMENT,
	nome_produto TEXT,
	descricao_produto TEXT,
	preco_produto REAL,
	qtd_estoque INTEGER,
	data_cadastro_produto TEXT DEFAULT (datetime('now')),
	categoria_id INTEGER NOT NULL,
	imagem TEXT,
	FOREIGN KEY (categoria_id) REFERENCES categoria(categoria_id)
);

CREATE TABLE produto_pedido (
	produto_pedido_id INTEGER PRIMARY KEY AUTOINCREMENT,
	qtd_produto_pedido INTEGER,
	preco_produto_pedido REAL,
	produto_id INTEGER,
	pedido_id INTEGER,
	FOREIGN KEY (pedido_id) REFERENCES pedido(pedido_id),
	FOREIGN KEY (produto_id) REFERENCES produto(produto_id)
);
