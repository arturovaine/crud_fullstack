
import fastify from 'fastify';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = fastify({ logger: true });

export async function productsRoutes(app, _options) {

  app.addHook('preValidation', app.authenticate);

  app.post('/', async (request, reply) => {
    const {
        nome_produto,
        descricao_produto,
        preco_produto,
        qtd_estoque,
        data_cadastro_produto,
        categoria_id,
        imagem  
    } = request.body;
    
    try {
      const connection = await app.mysql.getConnection();
      const [rows] = await connection.query(
        `INSERT INTO endereco (
            nome_produto,
            descricao_produto,
            preco_produto,
            qtd_estoque,
            data_cadastro_produto,
            categoria_id,
            imagem            
        )
        VALUES (
            '${nome_produto}'
            ,'${descricao_produto}'
            ,'${preco_produto}'
            ,'${qtd_estoque}'
            ,'${data_cadastro_produto}',
            ,'${categoria_id}',
            ,'${imagem}' 
        );`
    );
      connection.release();
      return rows;
    } catch (error) {
      reply.code(400).send(error);
    }
  });

  app.get('/', async (_request, reply) => {
    try {
      const connection = await app.mysql.getConnection();
      const [rows] = await connection.query('SELECT * FROM produto;');
      connection.release();
      return rows;
    } catch (error) {
      reply.code(400).send(error);
    }
  });
  
  app.get('/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const connection = await app.mysql.getConnection();
      const [rows] = await connection.query(`SELECT * FROM produto WHERE produto_id = '${id}';`);
      connection.release();
      return rows;
    } catch (error) {
      reply.code(400).send(error);
    }
  });

  app.put('/:id', async (request, reply) => {
    const { id } = request.params;
    const { email, username, senha, nome, cpf, telefone, data_nascimento, endereco_id } = request.body;
    try {
      const connection = await app.mysql.getConnection();
      const [rows] = await connection.query(
        `UPDATE produto
        SET nome_produto = '${nome_produto}',
            descricao_produto = '${descricao_produto}',
            preco_produto = '${preco_produto}',
            qtd_estoque = '${qtd_estoque}',
            data_cadastro_produto = '${data_cadastro_produto}',
            categoria_id = '${categoria_id}',
            imagem = '${imagem}',
        WHERE produto_id = '${id}';`);
      connection.release();
      return rows;
    } catch (error) {
      reply.code(400).send(error);
    }
  });

  app.delete('/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const connection = await app.mysql.getConnection();
      const [rows] = await connection.query(
        `DELETE FROM produto
        WHERE produto_id = '${id}';`);
      connection.release();
      return rows;
    } catch (error) {
      reply.code(400).send(error);
    }
  });

};
