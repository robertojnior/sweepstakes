import type { FastifyInstance } from 'fastify'

import { z } from 'zod'

import { Google as GoogleOauth } from '../lib/oauth2'

export async function routes(fastify: FastifyInstance) {
  fastify.get('/new', (_request, reply) => {
    const googleOauth = new GoogleOauth()

    reply.redirect(googleOauth.authUrl())
  })

  fastify.get('/', async (request, reply) => {
    const queryParamsSchema = z.object({
      code: z.string()
    })

    const { code } = queryParamsSchema.parse(request.query)

    const googleOauth = new GoogleOauth()

    const access_token = await googleOauth.accessToken(code)

    return reply.send({ access_token })
  })
}
