import type { FastifyInstance } from 'fastify'

import { PoolRepo } from '../repositories/PoolRepo'

const repo = new PoolRepo()

export async function routes(fastify: FastifyInstance) {
  fastify.get('/', () => repo.pool.findMany())
}
