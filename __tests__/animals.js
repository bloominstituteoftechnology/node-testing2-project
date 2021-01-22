const supertest = require('supertest')
const server = require('../server')
const db = require('../data/config')

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy() // closes the database connection
})

describe('animals integration tests', () => {
    it('gets a list of animals', async () => {
        const res = await supertest(server).get('/animals')
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.length).toBeGreaterThanOrEqual(4)
        expect(res.body[0].id).toBe(1)
        expect(res.body[0].name).toBe('frog')
    })

    it('gets one animal', async () => {
        const res = await supertest(server).get('/animals/1')
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.name).toBe('frog')
    })

    it('returns a 404 if animal is not found', async () => {
        const res = await supertest(server).get('/animals/77')
        expect(res.statusCode).toBe(404)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toBe('Animal not found')
    })

    it('creates a animal', async () => {
        const res = await supertest(server)
            .post('/animals')
            .send({name: 'gamer'})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body.name).toBe('gamer')
    })
})
