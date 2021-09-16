const request = require('supertest')
const usersRouter = require('./users-router')
const db = require('../../data/dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () =>{
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('[GET] /api/users', () =>{
    let res
    beforeEach(async () =>{
        res = await request(usersRouter).get('/')
    })
    test('responds with a 200 OK', async() =>{
        expect(res.status).toBe(200)
    })
    test('responds with all users', async () =>{
        expect(res.body).toHaveLength(4)
    })
})