const request = require('supertest')
const server = require('./server')
const db = require('../data/db-config')

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

describe('GET /api/things', () => {
    test('status 200 on success', async ()  => {
        const res = await request(server).get('/api/things')
        expect(res.status).toBe(200)
    })
    test('POST /api/things', async () => {
        const res = await request(server)
            .post('/api/things')
            .send({ thing: 'testy' })
            expect(res.status).toBe(201)
        
    })
})

//oopsssssssssieeeeeeeeees

