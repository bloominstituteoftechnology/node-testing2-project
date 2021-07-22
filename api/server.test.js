const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

test('is the correct environment', () => {
  expect(process.env.DB_ENV).toBe('testing')
})
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
}) // migrate
beforeEach(async () => {
  await db.seed.run()
}) // truncate and seed fresh data
afterAll(async () => {
  await db.destroy()
}) // disconnect from the db

describe('[POST] /hobbits', () => {
  test('responds with status code 201', async () => {
    const res = await request(server).post('/hobbits').send({
      name: 'bilbo'
    })
    expect(res.status).toBe(201)
  })

  test('responds with newly created hobbit', async () => {
    const res = await request(server).post('/hobbits').send({
      name: 'bilbo'
    })
    expect(res.body).toMatchObject({ id: 5, name: 'bilbo'})
  })

  test('snapshot', async () => {
    const res = await request(server).post('/hobbits').send({
      name: 'bilbo'
    })
    expect(res.body).toMatchSnapshot()
  })
})

describe('[DELETE] /hobbits', () => {
  test('remove hobbit from db', async () => {
    const [id] = await db('hobbits').insert(hobbit)
    let hobbit = await db('hobbits').where({id}).first()
    expect(hobbit).toBeTruthy()
    await request(server).delete('/hobbits/:id', id)
    hobbit = await db('hobbits').where({id}).first()
    expect(hobbit).toBeFalsy()
  })
})

