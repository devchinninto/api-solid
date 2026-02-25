import { Gym } from 'prisma/generated/prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
}
