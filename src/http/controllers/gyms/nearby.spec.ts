import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Nearby Gym',
        description: 'Some description.',
        phone: '1199999999',
        latitude: -7.1059557,
        longitude: -34.8488558
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Distant Gym',
        description: 'Some description.',
        phone: '1199999999',
        latitude: -3.9035118,
        longitude: -38.6918314
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -7.1059557,
        longitude: -34.8488558
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Nearby Gym'
      })
    ])
  })
})
