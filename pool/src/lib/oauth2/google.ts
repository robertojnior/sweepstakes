import { google } from 'googleapis'

export class Google {
  authUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'email profile'
    })
  }

  async accessToken(authCode: string) {
    const {
      tokens: { access_token }
    } = await this.oauth2Client.getToken(authCode)

    return access_token
  }

  async userInfo(accessToken: string) {
    const user = await fetch(process.env.GOOGLE_OAUTH_USER_INFO_URL!, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return user.json()
  }

  private get oauth2Client() {
    return new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REDIRECT_URI
    )
  }
}
