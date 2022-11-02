import { PoolRepo } from '../repositories/PoolRepo'

const repo = new PoolRepo()

export function routes(fastify: any, _opts: any, done: any) {
  fastify.get('/', () => repo.list())

  done()
}
