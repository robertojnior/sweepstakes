import type { FastifyInstance } from 'fastify'

import { prisma } from '../db/prisma'

export async function routes(fastify: FastifyInstance) {
  fastify.get('/', async (_request, reply) => {
    const users = await prisma.user.findMany()

    return reply.header('X-Total-Count', users.length).send({ users })
  })
}
