import { FastifyRequest, FastifyReply } from "fastify";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(201).send({ teste: "teste" })
}