const request = require('supertest')
const server = require('../server')
const db = require('../../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('GET /users', () => {
    test('[7] returns a status 200 OK', async () => {
        const res = await request(server).get('/users')
        expect(res.status).toBe(200)
      })

})