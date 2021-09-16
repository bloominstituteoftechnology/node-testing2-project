const request = require('supertest')
const server = require('./server')
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

describe('[GET] /hobbits', () => {
    let response
    beforeEach(async  () => {
        response = await request(server).get('/hobbits')
    })
    test('responds with a 200 OK', async () => {
        expect(response.status).toBe(200)
    })
    test('responds with all hobbits', async () => {
        expect(response.body).toHaveLength(4)
        expect(response.body).toMatchObject([
            { id:1 , name: 'tom'},
            { id:2 , name: 'mac'},
            { id:3 , name: 'pippa'},
            { id:4 , name: 'maddy'},
        ])
    })
})

describe('[POST] /hobbits', () => {
    test('responds with the new hobbit', async () => {
        const response = await request(server)
        .post('/hobbits')
        .send({ name: 'Rick'})
        expect(response.body).toMatchObject({ id: 5, name: 'Rick'})
    }, 600)
    test('responds with a 422 on missing name', async () => {
        const response = await request(server)
        .post('/hobbits')
        .send({ namz: 'Rick'})
        expect(response.status).toBe(422)
    }, 600)
})