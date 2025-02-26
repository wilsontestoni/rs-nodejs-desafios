import { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterOrganizationUseCase } from "../../../use-cases/factories/make-register-organization-use-case";
import { z } from "zod";
import { OrganizationAlreadyExistsError } from "../../../errors/organization-already-exists-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(), 
    password: z.string().min(4),
    phone: z.string(), 
    city: z.string(),
    state: z.string(),
    cep: z.string(), 
    address: z.string()
  })

  const organizationData = bodySchema.parse(request.body)

  try {
    const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

    await registerOrganizationUseCase.execute(organizationData)

  } catch (error) {
    if(error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send(error)
    }

    return reply.status(500).send()
  }

  return reply.status(201).send() 

}