import type { FastifyInstance } from 'fastify'

import { prisma } from '../db/prisma'

export async function routes(fastify: FastifyInstance) {
  fastify.get('/', async (_request, reply) => {
    const bets = await prisma.bet.findMany()

    return reply.header('X-Total-Count', bets.length).send({ bets })
  })
}
