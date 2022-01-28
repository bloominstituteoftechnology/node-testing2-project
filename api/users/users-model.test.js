const User = require('./users-model')
const db = require('../../data/db-config')

test('[1] NODE_ENV is correct', () => {
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

  describe('User model', () => {
    describe('User.find()', () => { 
      test.todo('[2] returns all users in table')
      test.todo('[3] returned users have id and name')
    })

    describe('User.findById(id)', () => { 
      test.todo('[4] returns the correct user')
    })

    describe('User.add(User)', () => { 
      test.todo('[5] db updates with the new user')
      test.todo('[6] resolves the newly created user')
    })
  })