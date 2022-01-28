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
        let users
        beforeEach(async () => {
          users = await User.find()
        })
        test('[2] returns all users in table',  () => {        
          expect(users).toHaveLength(3)
        })
        test('[3] returned Users have id and name', () => {
          expect(users[0]).toMatchObject({ user_id: 1, name: 'Rober F' })
        })
    })

    describe('User.findById(id)', () => { 
        let rober, Cian
        beforeEach(async () => {
          rober = await User.findById(1)
          Cian = await User.findById(2)
        })
        test('[4] returns the correct User', () => {
          expect(rober).toMatchObject({ user_id: 1, name: 'Rober F', address: '123 Rd, CA 12345'})
          expect(Cian).toMatchObject({ user_id: 2, name: 'Cian G', address: '456 Rd, NY 12345'})
        })
    })

    describe('User.add(User)', () => { 
      let home = { name: 'home H' }
      let result
      beforeEach( async () => {
        result = await User.add(home)
      })  

      test('[5] db updates with the new user', async () => {
        const theNewThing = await db('users')
          .where('user_id', 4)
          .first()

        expect(theNewThing).toMatchObject({ user_id: 4, name: 'home H' })
      })

      test('[6] resolves the newly created user', async () => {
        expect(result).toMatchObject({ user_id: 5, name: 'home H' })
      })
    })
  })