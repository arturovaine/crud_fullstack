
import Fastify from 'fastify';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

//import * as fastifySqlite from '@fastify/sqlite';

const app = Fastify({
  logger: true
});

/*
app.register(fastifySqlite,{
  connectionString: process.env.DATABASE_URL
});
*/

/*
server.register(require('@fastify/postgres'),{
  connectionString: process.env.DATABASE_URL
})
*/

app.get('/', function (request, reply){
  reply.send({ index: "hello world!"})
});

app.listen({ port: 3000 }, (error, address) => {
  if (error) {
    console.log(error);
    process.exit(1);    
  }
});
