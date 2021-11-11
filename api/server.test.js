const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

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

describe('[GET] /users', () => {
    test('responds with all the users', async () => {
        const res = await request(server).get('/users')
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(3)
    })
})
describe('[GET] /users/:id', () => {
    
})