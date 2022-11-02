import { prisma } from '../db/prisma'

export class PoolRepo {
  list() {
    return prisma.pool.findMany()
  }
}
