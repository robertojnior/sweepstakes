import type {
  FastifyInstance,
  RouteShorthandOptions,
  HookHandlerDoneFunction
} from 'fastify'
import { prisma } from '../db/prisma'

export function routes(
  fastify: FastifyInstance,
  options: RouteShorthandOptions,
  done: HookHandlerDoneFunction
) {
  fastify.get('/', options, () => prisma.pool.findMany())

  done()
}
