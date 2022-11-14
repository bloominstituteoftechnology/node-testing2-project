const db = require('../../data/dbConfig')
const User = require('./users-model')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()  
})

test('eviroment is testing', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('getAll', () => {
  test('resolves all the users in the table', async () => {
    const result = await User.getAll()
  })
})
