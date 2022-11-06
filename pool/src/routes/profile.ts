import type { FastifyInstance } from 'fastify'

import { authenticate } from '../middlewares/authenticate'

export async function routes(fastify: FastifyInstance) {
  fastify.get('/', { onRequest: authenticate }, (request, reply) => {
    reply.send({ user: request.user })
  })
}
