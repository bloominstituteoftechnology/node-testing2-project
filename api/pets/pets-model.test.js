const Pets = require('./pets-model')
const db = require('../../data/dbConfig')
const { pets } = require('../../data/seeds/001-pets')

test('is testing environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

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
