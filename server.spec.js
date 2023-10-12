const request = require('supertest')
const server = require('./api/server')
const db = require('./data/db-config')

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

describe('server.js', () => {
    describe('genere route', () => {
        it ('should return an OK status from the genere route', async () => {
            const expectedStatusCode = 200
            const response = await request(server).get('/api/genere/1')

            expect(response.status).toEqual(expectedStatusCode)
        })
        it ('should return status 404 from genere route if route is incorrect', async () => {
            const expectedStatusCode = 404
            const response = await request(server).get('/api/geneer')

            expect(response.status).toEqual(expectedStatusCode)
        })
    })
})