import type { FastifyInstance } from 'fastify'

import { routes as tokens } from './tokens'
import { routes as sessions } from './sessions'
import { routes as profile } from './profile'
import { routes as users } from './users'
import { routes as pools } from './pools'
import { routes as bets } from './bets'

export async function routes(fastify: FastifyInstance) {
  fastify.register(tokens, { prefix: '/tokens' })
  fastify.register(sessions, { prefix: '/sessions' })
  fastify.register(profile, { prefix: '/me' })
  fastify.register(users, { prefix: '/users' })
  fastify.register(pools, { prefix: '/pools' })
  fastify.register(bets, { prefix: '/bets' })
}
