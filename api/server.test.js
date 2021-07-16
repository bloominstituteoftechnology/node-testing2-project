const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity check', () => {
  expect(true).toBeTruthy()
})

describe('[GET] /', () => {
  it('returns a status 200 OK', async () => {
    const res = await request(server).get('/')
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ api: 'up!' })
    expect(res.body).toMatchSnapshot() // for large JSON
  })
})
describe('[POST] /user', () => {
  it('returns a status 201 CREATED', async () => {
    const res = await request(server).post('/users').send({ name: 'fifthUser' })
    expect(res.status).toBe(201)
  })
  it('returns newly created user', async () => {
    const res = await request(server).post('/users').send({ name: 'fifthUser' })
    // console.log(res)
    expect(res.body).toMatchObject({ id: 5, name: 'fifthUser' })
  })
})