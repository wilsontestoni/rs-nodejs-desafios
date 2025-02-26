import { Organization, Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organizations-repository";
import { randomUUID } from "crypto";

export class InMemoryOrganizationsRepository implements OrganizationRepository {
  public items: Organization[] = []

  async findByEmail(email: string) {
    const organizationEmail = this.items.find(item => item.email === email)

    if(!organizationEmail) {
      return null
    }

    return organizationEmail
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organizationData = {
      id: randomUUID(),
      name: data.name, 
      email: data.email, 
      password_hash: data.password_hash, 
      phone: data.phone, 
      state: data.state,
      city: data.city,
      cep: data.cep, 
      address: data.address,
      created_at: new Date()
    }

    this.items.push(organizationData);


    return organizationData
  }

}