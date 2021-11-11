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
    test('responds with Gabe', async () => {
        const res = await request(server).get(`/users/1`)
        expect(res.body).toMatchObject({ id: 1, name: "Leo" })
    })
    test('responds with status 404 and error message', async () => {
        const res = await request(server).get('/users/9')
        expect(res.status).toBe(404)
        expect(res.body.message).toBe('user not found')
    })
})
describe('[POST] /users', () => {
    test('responds with new users', async () => {
        const res = await request(server)
            .post('/users').send({ name: "Anatoli" })
        expect(res.status).toBe(201)
        expect(res.body).toMatchObject({id:4, name: "Anatoli"})
    })
    test('responds with correct error and message', async () => {
        const res = await request(server)
            .post('/users').send({ name: "         " })
        expect(res.status).toBe(401)
        expect(res.body.message).toBe('name field required')
    })
    test("trims user's name if successful", async () => {
        const res = await request(server)
        .post('/users').send({ name: "   Booooiii     " })
        expect(res.body.name).toBe("Booooiii")
    })
})