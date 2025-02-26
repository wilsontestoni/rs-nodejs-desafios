import { RegisterOrganizationUseCase } from "../register-organization"
import { PrismaOrganizationsRepository } from "../../repositories/prisma/prisma-organizations-repository"

export const makeRegisterOrganizationUseCase = () => {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const registerOrganizationUseCase = new RegisterOrganizationUseCase(prismaOrganizationsRepository)

  return registerOrganizationUseCase
}