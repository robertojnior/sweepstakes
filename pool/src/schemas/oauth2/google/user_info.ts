import { z } from 'zod'

type UserData = {
  id: string
  name: string
  email: string
  picture: string
}

const schema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  picture: z.string().url()
})

export class UserInfo {
  private userData: UserData

  constructor(userData: UserData) {
    this.userData = userData
  }

  validate() {
    return schema.parse(this.userData)
  }
}
