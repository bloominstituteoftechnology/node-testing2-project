const server = require('./server')
const request = require('supertest')
const db = require('../data/db-config')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async => {
    await db.seed.run()
})

afterAll(async => {
    await db.destroy()
})

test('test', () => {
    expect(true).toBe(true)
})

describe('[GET]/api/characters', () => {
    test('responds with all characters', async () => {
        const res = await request(server).get('/api/characters')
        expect(res.body).toHaveLength(5)
    })
    test('responds with 200 status', async () => {
        const res = await request(server).get('/api/characters')
        expect(res.status).toBe(200)
    })
})

