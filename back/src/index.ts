import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


const server: FastifyInstance = Fastify({
  logger: true
});

server.register(require('@fastify/mysql'),{
  connectionString: process.env.DATABASE_URL
});

/*
server.register(require('@fastify/postgres'),{
  connectionString: process.env.DATABASE_URL
})
*/

server.get('/', function (request: FastifyRequest, reply: FastifyReply){
  reply.send({ index: "hello world!"})
});

server.listen({ port: 3000 }, function(error: Error | null, address: string) {
  if (error) {
    console.log(error);
    process.exit(1);    
  }
});
