import type { FastifyInstance } from 'fastify'

import ShortUniqueId from 'short-unique-id'
import { z } from 'zod'

import { prisma } from '../db/prisma'

export async function routes(fastify: FastifyInstance) {
  fastify.get('/', async (_request, reply) => {
    const pools = await prisma.pool.findMany()

    return reply.status(200).header('X-Total-Count', pools.length).send(pools)
  })

  fastify.post('/', async (request, reply) => {
    const createPoolSchema = z.object({
      title: z.string()
    })

    const { title } = createPoolSchema.parse(request.body)

    const uniqueId = new ShortUniqueId({ length: 6 })

    const code = uniqueId().toUpperCase()

    await prisma.pool.create({
      data: {
        code,
        title
      }
    })

    return reply.status(201).send({ code })
  })
}
