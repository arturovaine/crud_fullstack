import Fastify, { FastifyRequest, FastifyReply } from 'fastify';

const fastify = Fastify({
  logger: true
});

fastify.get('/', function (request: FastifyRequest, reply: FastifyReply){
  reply.send({ index: "hello world!"})
});

fastify.listen({ port: 3000 }, function(error: Error | null, address: string) {
  if (error) {
    console.log(error);
    process.exit(1);    
  }
});
