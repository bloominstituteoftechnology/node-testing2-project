const request = require('supertest')
const router = require('./scheme-router')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('schemes').truncate()
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBeTruthy()
})

describe('[GET] /', () => {
  it('returns a status 200, GET SCHEMES', async () => {
    const res = await request(router).get('/')
    expect(res.status).toBe(200)
    expect(res.body)
  })
})
describe('[POST] /', () => {
  it('returns a status 201', async () => {
    const res = await request(router).post('/').send({ scheme_name: 'Victory' })
    expect(res.status).toBe(201)
  })
  it('returns newly created SCHEME', async () => {
    const res = await request(router).post('/').send({ scheme_name: 'Victory' })
    expect(res.body).toMatchObject({ scheme_id: 25, name: 'Victory' })
  })
})