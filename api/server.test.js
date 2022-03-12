const request = require('supertest')
const server = require('./server')
const db = require('../data/db.Config')

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

describe('GET /f1teams', () => {
    test('returns status 200 ok', async () => {
        const res = await request(server).get('/f1teams')
        expect(res.status).toBe(200)
    })
    test('returns array length', async () => {
        const res = await request(server).get('/f1teams')
        expect(res.body).toHaveLength(4)
    })
    test('match arr', async () => {
        const res = await request(server).get('/f1teams')
        expect(res.body).toBeInstanceOf(Array)
    })
})

describe('GET /f1teams/:id', () => {
    test('returns specific team name', async () => {
        const res = await request(server).get('/f1teams/1')
        expect(res.body.name).toBe('redbull')
    })
    test('returns an object with right number', async () => {
        const res = await request(server).get('/f1teams/2')
        expect(res.body.id).toBe(2)
    })
    test('return an object', async () => {
        const res = await request(server).get('/f1teams/3')
        expect(res.body).toBeInstanceOf(Object)
    })
})

describe('POST /f1teams', () => {
    test('returns status 201 when created', async () => {
        const res = await request(server).post('/f1teams').send({name: 'aston martin'})
        expect(res.status).toBe(201)
    })
    test('returns name of newly created team', async () => {
        const res = await request(server).post('/f1teams').send({name: 'alfa romeo'})
        expect(res.body.name).toBe('alfa romeo')
    })
    test('returns number of teams in arr', async () => {
        const res = await request(server).post('/f1teams').send({name: 'minardi'})
        expect(res.body.id).toBe(5)
        const teams = await db('f1teams')
        expect(teams).toHaveLength(5)
    })
})

describe('DELETE /f1teams/:id', () => {
    test('returns status 204 when successfully deleted', async () => {
        const res = await request(server).delete('/f1teams/4')
        expect(res.status).toEqual(204)
    })
})