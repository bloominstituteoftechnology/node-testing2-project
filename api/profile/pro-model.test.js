/* eslint-disable no-undef */
const Profile = require('./pro-model')
const db = require('../../data/db-config')

test('NODE_ENV is correct', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })

beforeAll(async() =>{
    await db.migrate.rollback() //where tf are these coming from?
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})
afterAll(async () => {
    await db.destroy() // disconnects from db
})

describe('Profile', () => {
    describe('Profile.getAll()', ()=>{
      let result
      beforeEach(async ()=>{
          result = await Profile.getAll()
      })

      it('resolves all Profiles in the table', async ()=>{
        expect(result).toHaveLength(4)
    })
  })
})