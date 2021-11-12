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

describe('[GET] /starks/:id', () => {
  test('responds with Jon Snow', async () => {
    const res = await request(server).get('/starks/1')
    expect(res.body).toMatchObject({ id: 1, name: 'Jon Snow' })
  })
})

describe('[POST] /starks', () => {
  test('responds with new Stark', async () => {
    const res = await request(server)
      .post('/starks').send({name: 'Ned'})
    expect(res.body).toMatchObject({id: 7, name: 'Ned'})
  })
})
