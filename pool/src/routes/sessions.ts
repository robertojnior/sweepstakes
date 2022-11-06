import type { FastifyInstance } from 'fastify'

import { z } from 'zod'

import { Google as GoogleOauth } from '../lib/oauth2'
import { GoogleUserInfoSchema } from '../schemas/oauth2'
import { UserRepo } from '../repositories/user_repo'

export async function routes(fastify: FastifyInstance) {
  fastify.post('/', async (request, reply) => {
    const requestBodySchema = z.object({
      access_token: z.string()
    })

    const { access_token } = requestBodySchema.parse(request.body)

    const userInfo = await new GoogleOauth().userInfo(access_token)

    const userData = new GoogleUserInfoSchema(userInfo).validate()

    const { id, name, avatarUrl } = await new UserRepo().findOrCreate({
      oauthId: userData.id,
      name: userData.name,
      email: userData.email,
      avatarUrl: userData.picture
    })

    const token = fastify.jwt.sign(
      { name, avatarUrl },
      { sub: id, expiresIn: '2 days' }
    )

    return reply.status(201).send({ token })
  })
}
