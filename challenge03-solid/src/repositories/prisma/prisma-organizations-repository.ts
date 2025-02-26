import { Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organizations-repository";
import { prisma } from "../../lib/prisma";

export class PrismaOrganizationsRepository implements OrganizationRepository {
 
  async findByEmail(email: string) {
    const organizationEmail = prisma.organization.findFirst({
      where: {
        email
      }
    })

    return organizationEmail
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = prisma.organization.create({ data })

    return organization
  }
  
}