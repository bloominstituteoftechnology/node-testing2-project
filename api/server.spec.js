const server = require('./server')
const supertest = require('supertest')
const db = require('../database/db-config')

afterEach(async () => {
    await db("users").truncate()
})

describe('server', () => {
    it('can run the tests', () => {
        expect(true).toBeTruthy()
    })

    describe('GET / users:', () => {
        it('returns status code 200', () => {
            return supertest(server)
            .get('/api/users')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })

        it('returns an array', () => {
            return supertest(server)
            .get('/api/users')
            .then(res => {
                expect(Array.isArray(res.body.data)).toBe(true)
            })
        })
    })
    describe('POST / users:', () => {
        it('returns status code 201', () => {
            return supertest(server)
            .post('/api/users')
            .send({username: "jesus5", password: "jesus5"})
            .then(res => {
                expect(res.status).toBe(201)
            })
        })

        it('returns created object', () => {
            return supertest(server)
            .post('/api/users')
            .send({username: "jesus6", password: "jesus6"})
            .then(res => {
                expect(res.body.data).toStrictEqual({ id:1, username: "jesus6", password: "jesus6"})
            })
        })
    })
    describe('DELETE / users:', () => {
        it('returns status code 200', async () => {
            await supertest(server)
            .post('/api/users')
            .send({username: "jesus5", password: "jesus5"})
            const del = await supertest(server)
            .delete('/api/users/1')
            expect(del.status).toBe(200)
        })
        it('returns deleted object', async () => {
            await supertest(server)
            .post('/api/users')
            .send({username: "jesus5", password: "jesus5"})
            const del = await supertest(server)
            .delete('/api/users/1')
            expect(del.body.deleted).toMatchObject({id:1, username: "jesus5", password: "jesus5"})
        })
    })
})
