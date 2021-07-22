const db = require('../../data/dbConfig.js')
const Book = require('./books-model')

test('sanity', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

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

describe('Books Model', () => {
  describe('getAll', () => {
    test('returns all books in db', async () => {
      const data = await Book.getAll()
      expect(data).toHaveLength(4)
    })
    test('Returns the correct books with all their props', async () => {
      const data = await Book.getAll()
      expect(data).toMatchObject([
        { "id": 1, "author": "Tolstoy" },
        { "id": 2, "author": "Solzhenitsyn" },
        { "id": 3, "author": "Dostoyevsky" },
        { "id": 4, "author": "Thoreau" },
      ])
    })
  })
  describe('getById', () => { 
    test('Returns the book by the given id', async () => {
      const tolstoy = await Book.getById(1)
      expect(tolstoy).toMatchObject({ "id": 1, "title": "Anna Karenina" , "author": "Tolstoy" })
    })
  })
  describe('Create', () => {
    test('Returns the created item', async () => {
      const input = { title: "Grapes of Wrath", author: "Steinbeck" }
      const steinbeck = await Book.create(input)
      expect(steinbeck).toMatchObject({ "id": 5, "title": "Grapes of Wrath", "author": "Steinbeck" })

      const data = await db('books')
      expect(data).toHaveLength(5)
    })
  })
  describe('Remove', () => {
    test('Removes the selected item', async () => {
      const thoreau = await Book.getById(4)
      expect(thoreau).toMatchObject({ "id": 4, "title": "A Winter Walk, 1843", "author": "Thoreau" })

      const data = await db('books')
      data.remove(4)
      expect(data).toHaveLength(3)
    })
  })
})