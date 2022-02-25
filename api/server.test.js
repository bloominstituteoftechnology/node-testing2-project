
 
const server = require('./server')
const request = require('supertest')
const db = require("../data/db-config");

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


test('test', ()=>{
    expect(true).toBe(true)
})

describe('GET /api/movies', () => {
    test('returns a status 200 OK', async () => {
      const res = await request(server).get('/api/movies')
      expect(res.status).toBe(200)
    })
  })

describe('[GET] /movies', () => {
    test('responds with all movies', async () => {
        const resp = await request(server).get('/api/movies')
        expect(resp.body).toHaveLength(4)
    })
    test('responds with 200 status', async () => {
        const resp = await request(server).get('/api/movies')
        expect(resp.status).toBe(200)
    })
})