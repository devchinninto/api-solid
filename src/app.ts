import fastify from 'fastify'
import { prisma } from './lib/prisma'

export const app = fastify()

prisma.user.create({
  data: {
    name: 'Marcelle',
    email: 'marcelle@email.com'
  }
})
