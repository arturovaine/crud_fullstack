
import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


const server: FastifyInstance = Fastify({
  logger: true
});

const routes = async () => {

  server.get('/api/categorias', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.get('/api/categorias/:id', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.post('/api/categorias/', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.put('/api/categorias/:id', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.delete('/api/categorias/:id', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

};

export default routes;
