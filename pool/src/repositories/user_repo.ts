import type { User } from '@prisma/client'

import { prisma } from '../db/prisma'

type UserData = Pick<User, 'oauthId' | 'name' | 'email' | 'avatarUrl'>

export class UserRepo {
  async findOrCreate({ oauthId, name, email, avatarUrl }: UserData) {
    let user = await prisma.user.findUnique({ where: { oauthId } })

    if (user) {
      return user
    }

    return prisma.user.create({
      data: {
        oauthId,
        email,
        name,
        avatarUrl
      }
    })
  }
}
