import { routes as pools } from './pools'

export function routes(fastify: any, _opts: any, done: any) {
  fastify.register(pools, { prefix: '/pools' })

  done()
}
