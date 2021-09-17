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

describe('[POST] /waxed-products', () => {
  test('Adds product to the table', async () => {
    let res = await request(server)
      .post('/waxed-products')
      .send({ name: 'Base Set Booster Box' })
    expect(res.body).toMatchObject({ id: 4, name: 'Base Set Booster Box' })
  })
  test('responds with a 201 added product', async () => {
    let res = await request(server)
        .post('/waxed-products')
        .send({ name: 'Base Set Booster Box' })
      expect(res.status).toBe(201)
  })
})

describe('[DELETE] /waxed-products', () => {
  test('Responds with correct amount of rows deleted', async () => {
    let res = await request(server)
      .delete('/waxed-products')
      .send({ id: 1 })
    expect(res.body).toEqual(1)
  })
  test('responds with a status code 200 on delete', async () => {
    let res = await request(server)
      .delete('/waxed-products')
      .send({ id: 1 })
    expect(res.status).toEqual(200)
  })
})