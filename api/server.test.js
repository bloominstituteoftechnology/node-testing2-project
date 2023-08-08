const request = require('supertest')
const db = require('../data/db-config')
const server = require('./server')


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe('correct env var', () => {
    test('correct env var', () => {
        expect(process.env.NODE_ENV).toBe('testing')
    })
})

describe('[GET] /capitals', () => {
    test('responds with 200 ok', async () => {
        const res = await request(server).get('/capitals')
        expect(res.status).toBe(200)
    })
    test('responds with all capitals', async () => {
        const res = await request(server).get('/capitals')
        expect(res.body).toHaveLength(5)
    })
})

describe('[GET] /capitals/:id', () => {
    test('get capital with id of 1', async () => {
        const res = await request(server).get('/capitals/1')
            expect(res.body).toEqual({ "city": 'Paris', "country": 'France', "capital_id": 1})
    })
    test('get capital with id of 2', async () => {
        const res = await request(server).get('/capitals/2')
            expect(res.body).toEqual({"city": 'Madrid', "country": 'Spain', "capital_id": 2})
    })
    test('get capital with id of 3', async () => {
        const res = await request(server).get('/capitals/3')
            expect(res.body).toEqual({"city": 'Ottawa', "country": 'Canada', "capital_id": 3})
    })
    test('get capital with id of 4', async () => {
        const res = await request(server).get('/capitals/4')
            expect(res.body).toEqual({"city": 'Washington DC', "country": 'USA', "capital_id": 4})
    })
    test('get capital with id of 5', async () => {
        const res = await request(server).get('/capitals/5')
            expect(res.body).toEqual({"city": "Dublin", "country": "Ireland", "capital_id": 5})
    })
})

describe('[POST] /capitals', () => {
    const newOne = { city: 'London', country: 'UK' }
    test('add new capital', async () => {
        await request(server).post('/capitals').send(newOne)
        expect(await db('capitals')).toHaveLength(6)
    })
    test('add another capital', async () => {
        const newTwo = {city: 'Cairo', country: 'Egypt'}
        await request(server).post('/capitals').send(newTwo)
        expect(await db('capitals')).toHaveLength(6)
    })
})