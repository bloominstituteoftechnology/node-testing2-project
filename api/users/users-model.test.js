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
describe('getById', () => {
  test('resolves the user by the given id', async () => {
    let result = await User.getById(1)
    expect(result).toMatchObject({ name: 'sara' })
    result = await User.getById(2)
    expect(result).toMatchObject({ name: 'john' })
    result = await User.getById(3)
    expect(result).toMatchObject({ name: 'andy' })
  })
})
describe('insert', () => {
  const jessica = { name: 'jessica' }
  test('resolves the newly created user', async () => {
    const result = await User.insert(jessica)
    expect(result).toMatchObject(jessica)
  })
})
