
import fastify from 'fastify';

import * as fastifyMySQL from '@fastify/mysql';

import bcrypt from 'bcrypt';
import jwt from 'fastify-jwt';
import authPlugin from './authPlugin.js';
import cors from '@fastify/cors'
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import routes from './routes/index.js';

const app = fastify({ logger: true });

app.register(cors, { origin: true });

await app.register(import('@fastify/swagger'))
await app.register(import('@fastify/swagger-ui'))
await app.register(import('@fastify/rate-limit'), { max: 200, timeWindow: '1 minute' })
app.register(jwt, { secret: 'TOPSECRET' });
app.register(authPlugin);
app.register(fastifyMySQL, { promise: true, connectionString: process.env.DATABASE_URL });


app.post('/login', async (request, reply) => {
  const { username, password } = request.body;

  try {
    const connection = await app.mysql.getConnection();
    const [rows] = await connection.query('SELECT * FROM cliente WHERE username = ?', [username]);
    connection.release();

    if (rows.length > 0) {
      let encryptedPassword = rows[0].senha;
      const match = await bcrypt.compare(password, encryptedPassword);
      
      if (match) {
        const { cliente_id, email, username, cpf } = rows[0];
        const token = app.jwt.sign({ cliente_id, email, username, cpf }, process.env.JWT_SECRET, { expiresIn: '24h' });
        reply.send({ token });
      } else {
        reply.status(401).send({ message: 'Usuário ou senha incorretos' });
      }
    } else {
      reply.status(401).send({ message: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    reply.code(500).send({ message: "Ocorreu um erro no login." });
    console.error(error);
  }
});

app.decorate("authenticate", async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

app.get('/api', { preValidation: [app.authenticate] }, async (req, reply) => {
  reply.send({ message: 'Você está autenticado!' });
});

app.register(routes.categoriesRoutes, { prefix: '/api/categories' })
app.register(routes.clientsRoutes, { prefix: '/api/clients' })
app.register(routes.addressesRoutes, { prefix: '/api/addresses' })
app.register(routes.ordersRoutes, { prefix: '/api/orders' })
app.register(routes.productsRoutes, { prefix: '/api/products' })
app.register(routes.ordersProductsRoutes, { prefix: '/api/orders/products' })

/*
app.register(swagger, {
  exposeRoute: true,
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'API de Exemplo',
      description: 'Documentação da API de Exemplo',
      version: '1.0.0'
    }
  }
});
*/

app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

app.listen({ port: 3000 }, (error, address) => {
    if (error) {
      console.log(error);
      process.exit(1);    
    }
});
