
import Fastify, { FastifyInstance, FastifyRequest, FastifyReply, errorCodes } from 'fastify';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


const app = Fastify({
  logger: true
});

const routes = async () => {
  
  app.post('/api/categorias/', function (request, reply) {
    //reply.send({ index: "hello world!" })
    try {
      
    } catch (error) {
      reply.send(error);
    }
  });
  
  app.get('/api/categorias', function (request, reply) {
    reply.send({ index: "hello world!" })
  });

  app.get('/api/categorias/:id', function (request, reply) {
    reply.send({ index: "hello world!" })
  });

  app.put('/api/categorias/:id', function (request, reply) {
    reply.send({ index: "hello world!" })
  });

  app.delete('/api/categorias/:id', function (request, reply) {
    reply.send({ index: "hello world!" })
  });

};

export default routes;
