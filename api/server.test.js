const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()  
})

describe('[GET] /', () => {
    test('responds with 200 ok', async () => {
        const res = await request(server).get('/')
        expect(res.status).toBe(200)
    })
    test('responds with api up', async () => {
        const res = await request(server).get('/')
        expect(res.body).toMatchObject({ api: 'up' })
    })
})

describe('[GET] /users', () => {
    test('responds with 200 ok', async () => {
        const res = await request(server).get('/users')
        expect(res.status).toBe(200)
    })
    test('responds with all the users', async () => {
        const res = await request(server).get('/users')
        expect(res.body).toHaveLength(3)
    })
})

describe('[GET] /users/:id', () => {
    test('responds with 200 ok', async () => {
        const res = await request(server).get('/users/1')
        expect(res.status).toBe(200)
    })
    test('resolves with the user at that id', async () => {
        const res = await request(server).get('/users/1')
        expect(res.body).toMatchObject({ name: 'sara' })
    })
})

describe('[POST] /users', () => {
    const jessica = { name: 'jessica' }
    test('responds with 201 created', async () => {
        const res = await request(server).post('/users').send(jessica)
        expect(res.status).toBe(201)
    })
    test('adds a user to the database', async () => {
        await request(server).post('/users').send(jessica)
        expect(await db('users')).toHaveLength(4)
    })
    test('responds with newly created user', async () => {
       const res = await request(server).post('/users').send(jessica)
       expect(res.body).toMatchObject(jessica)
    })
})