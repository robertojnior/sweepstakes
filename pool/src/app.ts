import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { routes } from './routes/router'

const app = Fastify({ logger: true })

app.register(jwt, { secret: process.env.SECRET_KEY_BASE! })
app.register(cors, { origin: true })
app.register(routes)

async function boot() {
  await app.listen({ port: 3000 })
}

boot()
