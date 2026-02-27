import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let usersRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(usersRepository)
  })

  it('should be able to create a new gym', async () => {
    const { gym } = await sut.execute({
      title: 'JS Factory',
      description: null,
      phone: null,
      latitude: -7.1059557,
      longitude: -34.8488558
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
