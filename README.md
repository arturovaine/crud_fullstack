### Context

- Creation of a CRUD Full Stack application based on tables with .ddl already defined

### Preview

![alt text](app.gif "App")

### Requirements, list of features and aspects of the application

- Application in "monorepo" configuration

### Backend

Basic implementations/functionalities
- [x] <b>Rest API that allows “CRUD” operations to be carried out on all entities;</b>
- [x] <b>API/backend in Node.js using the Fastify framework;</b>
- [x] <b>DBMS of any applicable preference; MySQL chosen -> there is native plugin Fastify</b>
- [x] <b>Security control: "rate limit" and jwt for access to API endpoints (Bearer token);</b>
- [x] Swagger implemented for accessing API documentation;
- [x] <b>SQL file containing the final DDL and some example data inserts;</b>
- [x] <b>Postman or Insomnia collection, in JSON format, for API testing.</b>

> Login "Superuser" -> "username": "client01", "password": "password01"

Additional
- [ ] Controllers (responsibility for request and response)
- [ ] Error and validation middleware
- [ ] Services (business rules)
- [ ] Models (responsibility only for CRUD in the database)
- [x] <b>Routes (route organization)</b>
- [ ] ORM implementation (Sequelize, TypeORM, Prisma,...)
- [ ] TypeScript
- [ ] Docker
- [ ] Tests (unit, integration)

> npm install && node ./back/src/index.js

### Front-end

Basic implementations/functionalities
- [x] Frontend developed in React;
- [x] Front-end allows you to perform all CRUD operations on existing entities;

Additional
- [ ] Layouts and organization of screens, as well as the possible use of extra components/libraries, ...
- [ ] Docker
- [ ] Tests (unit, integration)
