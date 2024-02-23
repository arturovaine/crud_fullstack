
import fastify from 'fastify';

const app = fastify({ logger: true });

export const createCategory = async (request, reply) => {

};

export const getCategories = async (_request, reply) => {
  try {
    const connection = await app.mysql.getConnection();
    const [rows] = await connection.query('SELECT * FROM categoria;');
    connection.release();
    return rows;
  } catch (error) {
    reply.code(400).send(error);
  }
}

export const getCategoryById = async (request, reply) => {

};

export const updateCategoryById = async (request, reply) => {

};

export const deleteCategoryById = async (request, reply) => {

};
