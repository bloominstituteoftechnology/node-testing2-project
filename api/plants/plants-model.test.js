// Write test here
const Plants = require('./plants-model')
const db = require('../../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('plants').truncate()
})
afterAll(async () => {
  await db.destroy()
})

describe('Plants', () => {

    
  })