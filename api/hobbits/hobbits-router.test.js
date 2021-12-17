const request = require('supertest')
const server = require('../server')
const database = require('../../data/dbConfig')

beforeAll(async () => {
  await database.migrate.rollback()
  await database.migrate.latest()
})
beforeEach(async () => {
  await database.seed.run()
})
afterAll(async () => {
  await database.destroy()
})

it('is the correct env', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})
describe('hobbits router', () => {
  describe('[GET] /hobbits', () => {
    let res
    beforeEach(async () => {
      res = await request(server).get('/hobbits')
    })
    it('responds with 200 OK', async () => {
      expect(res.status).toBe(200)
    })
    it('responds with all hobbits', async () => {
      expect(res.body).toHaveLength(4)
    })
  })
  describe('[POST] /hobbits', () => {
    let res
    beforeEach(async () => {
      res = await request(server)
        .post('/hobbits/')
        .send({ name: 'gabe' })
    })
    it('responds with a 210 created', async () => {
      expect(res.status).toBe(201)
    })
    it('responds with new hobbit', async () => {
      expect(res.body).toMatchObject({ id: 5, name: 'gabe' })
    })
    it('responds with da new (snapshot)', () => {
      expect(res.body).toMatchSnapshot()
    })
  })
})