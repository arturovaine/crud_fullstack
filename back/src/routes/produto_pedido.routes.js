
import fastify from 'fastify';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = fastify({ logger: true });

export async function ordersProductsRoutes(app, _options) {

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
      const [rows] = await connection.query('SELECT * FROM produto_pedido;');
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
      const [rows] = await connection.query(`SELECT * FROM produto_pedido WHERE produto_pedido_id = '${id}';`);
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
        `UPDATE produto_pedido
        SET qtd_produto_pedido = '${qtd_produto_pedido}',
            preco_produto_pedido = '${preco_produto_pedido}',
            produto_id = '${produto_id}',
            pedido_id = '${pedido_id}'
        WHERE produto_pedido_id = '${id}';`);
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
        `DELETE FROM produto_pedido
        WHERE produto_pedido_id = '${id}';`);
      connection.release();
      return rows;
    } catch (error) {
      reply.code(400).send(error);
    }
  });

};
