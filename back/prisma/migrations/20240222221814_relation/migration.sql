-- CreateTable
CREATE TABLE "categoria" (
    "categoria_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_categoria" TEXT,
    "descricao_categoria" TEXT
);

-- CreateTable
CREATE TABLE "cliente" (
    "cliente_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "username" TEXT,
    "senha" TEXT,
    "nome" TEXT,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT,
    "data_nascimento" DATETIME,
    "endereco_id" INTEGER NOT NULL,
    CONSTRAINT "cliente_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "endereco" ("endereco_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "endereco" (
    "endereco_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cep" TEXT,
    "rua" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "uf" TEXT
);

-- CreateTable
CREATE TABLE "pedido" (
    "pedido_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero_pedido" INTEGER,
    "valor_total_pedido" REAL,
    "data_pedido" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN,
    "cliente_id" INTEGER NOT NULL,
    CONSTRAINT "pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente" ("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "produto" (
    "produto_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_produto" TEXT,
    "descricao_produto" TEXT,
    "preco_produto" REAL,
    "qtd_estoque" INTEGER,
    "data_cadastro_produto" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoria_id" INTEGER NOT NULL,
    "imagem" TEXT,
    CONSTRAINT "produto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria" ("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "produto_pedido" (
    "produto_pedido_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qtd_produto_pedido" INTEGER,
    "preco_produto_pedido" REAL,
    "produto_id" INTEGER,
    "pedido_id" INTEGER,
    CONSTRAINT "produto_pedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto" ("produto_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "produto_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido" ("pedido_id") ON DELETE SET NULL ON UPDATE CASCADE
);
