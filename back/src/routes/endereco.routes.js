
import fastify from 'fastify';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = fastify({ logger: true });

export async function addressesRoutes(app, _options) {

  app.addHook('preValidation', app.authenticate);

  app.post('/', async (request, reply) => {
    const { cep,
        rua,
        bairro,
        cidade,
        numero,
        complemento,
        uf } = request.body;
    try {
      const connection = await app.mysql.getConnection();
      const [rows] = await connection.query(
        `INSERT INTO endereco (
            cep,
            rua,
            bairro,
            cidade,
            numero,
            complemento,
            uf
        )
        VALUES (
            '${cep}'
            ,'${rua}
            ,'${bairro}
            ,'${cidade}
            ,'${numero}
            ,'${complemento}
            ,'${uf}'
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
      const [rows] = await connection.query('SELECT * FROM endereco;');
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
      const [rows] = await connection.query(`SELECT * FROM endereco WHERE endereco_id = '${id}';`);
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
        `UPDATE endereco
        SET cep = '${cep}',
            rua = '${rua}',
            bairro = '${bairro}',
            cidade = '${cidade}',
            numero = '${numero}',
            complemento = '${complemento}',
            uf = '${uf}'
        WHERE endereco_id = '${id}';`);
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
        `DELETE FROM endereco
        WHERE endereco_id = '${id}';`);
      connection.release();
      return rows;
    } catch (error) {
      reply.code(400).send(error);
    }
  });

};
