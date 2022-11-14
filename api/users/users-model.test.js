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
    expect(result).toHaveLength(3)
  })
  test('resolves the correct user', async () => {
    const result = await User.getAll()
    expect(result[0]).toMatchObject({ name: 'sara' })
    expect(result[1]).toMatchObject({ name: 'john' })
    expect(result[2]).toMatchObject({ name: 'andy' })
  })
})
