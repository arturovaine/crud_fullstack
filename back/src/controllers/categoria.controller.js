
import { FastifyReply, FastifyRequest } from 'fastify';
//import { PrismaClient } from '@prisma/client'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export const createCategory = async (request, reply) => {
  const { nome_categoria, descricao_categoria } = request.body;
  try {
    const category = await prisma.categoria.create({
      data: {
        nome_categoria,
        descricao_categoria,
      },
    });
    reply.code(201).send(category);
  } catch (error) {
    reply.code(400).send(error);
  }
};

export const getCategoryById = async (request, reply) => {
  const { id } = request.params;
  try {
    const category = await prisma.categoria.findUnique({
      where: { categoria_id },
    });
    if (category) {
      reply.send(category);
    } else {
      reply.code(404).send({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    reply.code(400).send(error);
  }
};
