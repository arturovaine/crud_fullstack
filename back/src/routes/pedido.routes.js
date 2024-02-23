
import fastify from 'fastify';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = fastify({ logger: true });

export async function ordersRoutes(app, _options) {

  app.post('/', async (request, reply) => {
    const {
        numero_pedido,
        valor_total_pedido,
        data_pedido,
        status,
        cliente_id
    } = request.body;
    
    try {
      const connection = await app.mysql.getConnection();
      const [rows] = await connection.query(
        `INSERT INTO endereco (
            numero_pedido,
            valor_total_pedido,
            data_pedido,
            status,
            cliente_id
        )
        VALUES (
            '${numero_pedido}'
            ,'${valor_total_pedido}'
            ,'${data_pedido}'
            ,'${status}'
            ,'${cliente_id}'
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
      const [rows] = await connection.query('SELECT * FROM pedido;');
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
      const [rows] = await connection.query(`SELECT * FROM pedido WHERE pedido_id = '${id}';`);
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
        `UPDATE pedido
        SET numero_pedido = '${numero_pedido}',
            valor_total_pedido = '${valor_total_pedido}',
            data_pedido = '${data_pedido}',
            status = '${status}',
            cliente_id = '${cliente_id}'
        WHERE pedido_id = '${id}';`);
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
        `DELETE FROM pedido
        WHERE pedido_id = '${id}';`);
      connection.release();
      return rows;
    } catch (error) {
      reply.code(400).send(error);
    }
  });

};
