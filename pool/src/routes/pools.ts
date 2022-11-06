import type { FastifyInstance } from 'fastify'

import ShortUniqueId from 'short-unique-id'
import { z } from 'zod'

import { prisma } from '../db/prisma'
import { authenticate } from '../middlewares/authenticate'

export async function routes(fastify: FastifyInstance) {
  fastify.get('/', async (_request, reply) => {
    const pools = await prisma.pool.findMany()

    return reply.header('X-Total-Count', pools.length).send({ pools })
  })

  fastify.post('/', { onRequest: authenticate }, async (request, reply) => {
    const createPoolSchema = z.object({
      title: z.string()
    })

    const { title } = createPoolSchema.parse(request.body)

    const uid = new ShortUniqueId({ length: 6 })

    const code = String(uid().toUpperCase())

    await prisma.pool.create({
      data: {
        code,
        title,
        ownerId: request.user.sub
      }
    })

    return reply.status(201).send({ code })
  })
}
