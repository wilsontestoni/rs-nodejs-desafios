import { FastifyInstance } from "fastify";
import { create } from './register'

export async function organizationsRoutes(app: FastifyInstance) {

  
  app.post('/organizations', create)
}