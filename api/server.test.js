const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('books').truncate()
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBeTruthy()
})

describe('[GET] /', () => {
  it('Returns a status 200 OK', async () => {
    const res = await request(server).get('/')
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ api: 'Running!' })
  })
})

describe('[GET] /books', () => {
    it('Returns a status 200 OK', async () => {
      const res = await request(server).get('/books')
      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(4)
    })
})

describe('[POST] /books', () => {
  it('Returns a status 201 CREATED', async () => {
    const res = await request(server).post('/books').send({ title: "The CIA and the Cult of Intelligence", author: "Marchetti" })
    expect(res.status).toBe(201)
  })
  it('Returns newly created book', async () => {
    const res = await request(server).post('/books').send({ title: "The CIA and the Cult of Intelligence", author: "Marchetti" })
    expect(res.body).toMatchObject({ id: 5, title: "The CIA and the Cult of Intelligence", author: "Marchetti" })
  })
})

describe('[DELETE] /books/:id', () => {
    it('Returns a status 204 DELETED', async () => {
      const res = await request(server).delete('/books/4')
      expect(res.status).toBe(204)
    })
    it('Returns shorter list', async () => {
      const res = await request(server).delete('/books/4')
      expect(res.body).toHaveLength(3)
    })
  })