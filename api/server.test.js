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

describe('[GET] /pets', () => {
    test('responds with all the pets', async () => {
      const res = await request(server).get('/pets')
      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(4)
    })
  })
  
  describe('[GET] /pets/:id', () => {
    test('responds with clem', async () => {
      const res = await request(server).get('/pets/1')
      expect(res.body).toMatchObject({ id: 1, name: 'clem' })
    })
  })
  
  describe('[POST] /pets', () => {
    test('responds with new hobbit', async () => {
      const res = await request(server)
        .post('/pets').send({ name: 'franklin' })
      expect(res.body).toMatchObject({ id: 5, name: "franklin" })
    })
    test('responds with status 201', async () => {
      const res = await request(server)
        .post('/pets').send({ name: 'franklin' })
      expect(res.status).toBe(201)
    })
  })
