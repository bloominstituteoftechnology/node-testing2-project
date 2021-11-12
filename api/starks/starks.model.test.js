const Stark = require('./starks-model')
const db = require('../../data/db-config')
const {starks} = require('../../data/seeds/01-starks')

test('sanity check', () => {
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

describe('Stark Model', () => {
  describe('getAll()', () => {
    let data
    beforeEach(async () => {
      data = await Stark.getAll()
    })
    test('gets all Starks from db', async () => {
      expect(data.length).toBe(6)
      expect(data).toHaveLength(6)
    })
  })
})
