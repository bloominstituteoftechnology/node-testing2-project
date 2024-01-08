const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

const knex = require('knex')
const knexConfig = require('../knexfile')

const testDb = knex(knexConfig.testing)

beforeAll(async () => {
    await testDb.migrate.rollback(); // so any changes to migration files are picked up
    await testDb.migrate.latest();
})
beforeEach(async () => {
    await testDb('pets').truncate();
    await testDb.seed.run()
})
afterAll(async () => {
    await testDb.destroy();
})

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.NODE_ENV).toBe('testing')
    })

    describe('[GET] /', () => {
        it('should return 200 OK', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
        it('should return JSON', async () => {
            const res = await request(server).get('/')
            expect(res.type).toBe('application/json')
        })
        it('should return { api : "up" }', async () => {
            const res = await request(server).get('/')
            expect(res.body).toEqual({ api: 'up'})
        })
    })

    describe('[GET] /pets', () => {
        it('responds with 200 ok', async () => {
            const res = await request(server).get('/pets')
            expect(res.status).toBe(200)
        })
        it('responds with pets if there are pets', async () => {
            const res = await request(server).get('/pets')
            expect(res.body).toHaveLength(3)
        })
    })

    describe('[GET] /pets/:id', () => {
        it('resolves to the pet with the given id', async () => {
            let res = await request(server).get('/pets/1')
            expect(res.body).toMatchObject({ id: 1, name: 'Cooper' })
        })

        it('responds with 404 if not in db', async () => {
            let res = await request(server).get('/pets/5')
            expect(res.status).toBe(404)
        })
    })

    describe('[POST] /pets', () => {
        it('returns the newly created pet', async () => {
            const res = await request(server).post('/pets').send({ name: 'Fluffy' })
            expect(res.body).toMatchObject({ id: 4, name: 'Fluffy'})
        })
        it('after inserting a new pet, GET resolves to the updated array of pets', async () => {
            await request(server).post('/pets').send({ name: 'Fluffy' })
            const res = await request(server).get('/pets')
            expect(res.body).toHaveLength(4)
        })
    })
})