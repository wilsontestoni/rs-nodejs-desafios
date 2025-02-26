import { Organization } from "@prisma/client";
import { OrganizationRepository } from "../repositories/organizations-repository";
import { hash } from "bcryptjs";
import { OrganizationAlreadyExistsError } from "../errors/organization-already-exists-error";

interface RegisterOrganizationRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string, 
  state: string,
  cep: string;
  address: string;
}

interface RegisterOrganizationReponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({ name, email, password, phone, city, state, cep, address }: RegisterOrganizationRequest): Promise<RegisterOrganizationReponse> {

    const password_hash = await hash(password, 8);

    const hasOrganizationEmail = await this.organizationRepository.findByEmail(email)

    if(hasOrganizationEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationRepository.create({
      name,
      email,
      password_hash,
      phone,
      city, 
      state,
      cep,
      address,
    })


    return {
      organization
    }

  }

}