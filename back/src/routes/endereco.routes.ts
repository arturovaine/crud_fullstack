
import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


const server: FastifyInstance = Fastify({
  logger: true
});

const routes = async () => {

  server.get('/api/enderecos', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.get('/api/enderecos/:id', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.post('/api/enderecos/', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.put('/api/enderecos/:id', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

  server.delete('/api/enderecos/:id', function (request: FastifyRequest, reply: FastifyReply) {
    reply.send({ index: "hello world!" })
  });

};

export default routes;
