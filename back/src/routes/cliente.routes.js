
import fastify from 'fastify';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = fastify({ logger: true });

export async function clientsRoutes(app, _options) {

  app.addHook('preValidation', app.authenticate);

  app.post('/', async (request, reply) => {
    const { email, username, senha, nome, cpf, telefone, data_nascimento, endereco_id } = request.body;
    try {
      const connection = await app.mysql.getConnection();
      const [rows] = await connection.query(
        `INSERT INTO cliente (
            email
            , username
            , senha
            , nome
            , cpf
            , telefone
            , data_nascimento
            , endereco_id )
        VALUES (
            '${email}'
            ,'${username}
            ,'${senha}
            ,'${nome}
            ,'${cpf}
            ,'${telefone}
            ,'${data_nascimento}'
            ,${endereco_id});`
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
      const [rows] = await connection.query('SELECT * FROM cliente;');
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
      const [rows] = await connection.query(`SELECT * FROM cliente WHERE cliente_id = '${id}';`);
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
        `UPDATE cliente
        SET email = '${email}',
            username = '${username}',
            senha = '${senha}',
            nome = '${nome}',
            cpf = '${cpf}',
            telefone = '${telefone}',
            data_nascimento = '${data_nascimento}',
            endereco_id = '${endereco_id}'
        WHERE cliente_id = '${id}';`);
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
        `DELETE FROM cliente
        WHERE cliente_id = '${id}';`);
      connection.release();
      return rows;
    } catch (error) {
      reply.code(400).send(error);
    }
  });

};
