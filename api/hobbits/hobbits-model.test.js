const db = require('../../data/dbConfig')
const Hobbit = require('./hobbits-model')

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

describe('hobbits model', () => {
  describe('getAll', () => {
    test('it retursn all hobbits in the tablel', async () => {
      const hobbits = await Hobbit.getAll()
      expect(hobbits).toHaveLength(4)
      expect(hobbits).toMatchObject([
        { id: 1, name: 'sam' },
        { id: 2, name: 'frodo' },
        { id: 3, name: 'pippin' },
        { id: 4, name: 'merry' },
      ])
    })
  })
  describe('insert', () => {
    test('it creates a new hobbit in the db', async () => {
      const hobbit = { name: 'bilbo' }
      await Hobbit.insert(hobbit)
      const inserted = await db('hobbits').where('id', 5).first()
      expect(inserted).toMatchObject({ id: 5, name: 'bilbo' })
    })
    test('it resolves to the newly created hobbit', async () => {
      const hobbit = { name: 'bilbo' }
      const inserted = await Hobbit.insert(hobbit)
      expect(inserted).toMatchObject({ id: 5, name: 'bilbo' })
    })
  })
})
