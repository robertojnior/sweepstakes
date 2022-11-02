import type { FastifyInstance } from 'fastify'

import { routes as pools } from './pools'

export async function routes(fastify: FastifyInstance) {
  fastify.register(pools, { prefix: '/pools' })
}
