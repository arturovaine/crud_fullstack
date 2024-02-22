
import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


const server: FastifyInstance = Fastify({
  logger: true
});

const routes = async () => {

  server.get('/api/pedidos', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.get('/api/pedidos/:id', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.post('/api/pedidos/', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.put('/api/pedidos/:id', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.delete('/api/pedidos/:id', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

};

export default routes;
