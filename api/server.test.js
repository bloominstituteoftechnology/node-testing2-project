const server = require('./server')
const request = require('supertest')
const db = require('../data/db-config')

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

describe('[GET] /starks', () => {
  test('responds with all starks', async () => {
    const res = await request(server).get('/starks')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(6)
  })
})

describe('', () => {
  
})

describe('', () => {
  
})
