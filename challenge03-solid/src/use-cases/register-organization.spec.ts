import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterOrganizationUseCase } from './register-organization'

import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';

let sut: RegisterOrganizationUseCase;
let organizationRepository: InMemoryOrganizationsRepository;

describe('Register Organization Use cases', () => {

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationUseCase(organizationRepository)
  })

  it('should not be able to create an organization with same email twice', async () => {
    const organizationRegistered = {
      name: 'Tester', 
      email: 'test@email.com', 
      password: '123456', 
      phone: '11232221234', 
      city: 'São Paulo',
      state: 'São Paulo',
      cep: '03232010', 
      address: 'Carrão, 288'
    }

    await sut.execute(organizationRegistered);

    const newOrganization = {
      name: 'Tester', 
      email: 'test@email.com', 
      password: '123456', 
      phone: '11232221234', 
      cep: '03232010', 
      city: 'São Paulo',
      state: 'São Paulo',
      address: 'Carrão, 288'
    }

    expect(() => sut.execute(newOrganization)).rejects.toBeInstanceOf(OrganizationAlreadyExistsError);
  })

  it('should be able to hash the password', async () => {
   
    const organizationData = {
      name: 'Tester', 
      email: 'test@email.com', 
      password: '123456', 
      phone: '11232221234', 
      city: 'São Paulo',
      state: 'São Paulo',
      cep: '03232010', 
      address: 'Carrão, 288'
    }

    const { organization } = await sut.execute(organizationData);

    const hashedPassword = await compare('123456', organization.password_hash);

    expect(hashedPassword).toBe(true);
  })

  it('should be able to create an organization', async () => {
    const organizationData = {
      name: 'Tester', 
      email: 'test@email.com', 
      password: '123456', 
      phone: '11232221234', 
      city: 'São Paulo',
      state: 'São Paulo',
      cep: '03232010', 
      address: 'Carrão, 288'
    }

    const { organization } = await sut.execute(organizationData);

    expect(organization.id).toEqual(expect.any(String))

  })
}) 