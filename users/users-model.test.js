const db = require('../../data/dbConfig.js')
const User = require('./users-model')

test('sanity', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

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

describe('users model', () => {
  describe('getAll', () => {
    test('returns all users in db', async () => {
      const data = await User.getAll()
      expect(data).toHaveLength(4)
    })
    test('resturns the correct users with all their props', async () => {
      const data = await User.getAll()
      expect(data).toMatchObject([
        { "id": 1, "name": "rhiannon" },
        { "id": 2, "name": "tony" },
        { "id": 3, "name": "chris" },
        { "id": 4, "name": "durrell" },
      ])
    })
  })
  describe('getById', () => {
    test('returns the user by the given id', async () => {
      const sam = await User.getById(1)
      expect(sam).toMatchObject({ "id": 1, "name": "rhiannon" })
    })
  })
  describe('insert', () => {
    test('returns the inserted row', async () => {
      const input = { name: 'fifthUser' }
      const fifthUser = await User.insert(input)
      expect(fifthUser).toMatchObject({ "id": 5, "name": "fifthUser" })

      // probably should be a different test
      const data = await db('users') // DO NOT DO User.getAll HERE!!!!
      expect(data).toHaveLength(5)
    })
  })
})
