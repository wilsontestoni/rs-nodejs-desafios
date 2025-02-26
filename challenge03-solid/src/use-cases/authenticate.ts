import { Organization } from "@prisma/client";
import { OrganizationRepository } from "../repositories/organizations-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateReponse {
  organization: Organization;
}

export class AuthenticateUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateReponse> {

    const organization = await this.organizationRepository.findByEmail(email);

    if(!organization) {
      throw new InvalidCredentialsError()
    }

    const passwordMatch = compare(password, organization.password_hash)

    if(!passwordMatch) {
      throw new InvalidCredentialsError()
    }

    return { 
      organization
    }
    
  }

}