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

describe('[GET] /api/users', () => {
    let res
    beforeEach(async () => {
       res = await request(server).get('/api/users')
    })
    test('responds with 200 OK', async () => {
        expect(res.status).toBe(200)
    })
    test('responds with all (3) the users', async () => {
        expect(res.body).toHaveLength(3)
    })
    test('responds with right structure', async () => {
        expect(res.body).toMatchObject([
            { id: 1, name: 'leo'},
            { id: 2, name: 'gabe'},
            { id: 3, name: 'james'}
        ])
    })
})
describe('[GET] /api/users/id', () => {
    test("get a user by it's id", async () => {
        const res = await request(server).get(`/api/users/${1}`)
        expect(res.body).toMatchObject({ id: 1, name: 'leo'})
    })
})
describe('[POST] /api/users', () => {
    let res
    beforeEach(async () => {
        res = await request(server).post('/api/users').send({ name: 'boris' })
    })
    test('responds with 201 CREATED', async () => {
        expect(res.status).toBe(201)
    })
    test('causes a user to be added to the db', async () => {
        const users = await db('users')
        expect(users).toHaveLength(4)
    })
    it('responds with the newly created user', () => {
        expect(res.body).toMatchSnapshot()
    })
})
describe('[DELETE] /api/users/:id', () => {
    let res
    beforeEach(async () => {
        res = await request(server).delete(`/api/users/${1}`)
    })
    test('responds with code 200 OK', () => {
        expect(res.status).toBe(200)
    })
    test('causes the use to be deleted form db', async () => {
        const nukedUsers = await db('users')
        expect(nukedUsers).toMatchObject(([
            { id: 2, name: 'gabe'},
            { id: 3, name: 'james'}
        ]))
    })
    it('responds with the deleted user', () => {
        expect(res.body).toMatchSnapshot()
    })
})