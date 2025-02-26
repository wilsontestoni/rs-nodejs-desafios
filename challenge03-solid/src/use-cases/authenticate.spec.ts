import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { RegisterOrganizationUseCase } from './register-organization'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { AuthenticateUseCase } from './authenticate';

let sut: AuthenticateUseCase;
let organizationRepository: InMemoryOrganizationsRepository;

describe('Authenticate Use cases', () => {

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationRepository)
  })

  it('should be able authenticate the organization', async () => {
    const organizationData = {
      name: 'Tester', 
      email: 'test@email.com', 
      password_hash: await hash('123456', 6), 
      phone: '11232221234', 
      city: 'São Paulo',
      state: 'São Paulo',
      cep: '03232010', 
      address: 'Carrão, 288'
    }

    await organizationRepository.create(organizationData)

    const organizationLoginData = {
      email: 'test@email.com',
      password: '123456'
    }
    
    const { organization } = await sut.execute(organizationLoginData)

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able authenticate with the wrong email', async () => {

    await expect(() => 
      sut.execute({
        email: 'tes@email.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
    

  })

}) 