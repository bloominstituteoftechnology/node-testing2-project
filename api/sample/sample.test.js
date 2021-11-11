const Sample = require('./sample')
const request = require('supertest')
const db = require('../../dbConfig')

test('is testing environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

// beforeAll(async () => {
//     await db.migrate.rollback()
//     await db.migrate.latest()
// })

// beforeEach(async () => {
//     await db.seed.run()
// })

// afterAll(async () => {
//     await db.destroy()
// })

// describe('Sample test', () => {
//     describe('getAll()', () => {
//         let data
//         beforeEach(async () => {
//             data = await Sample.getAll() 
//         })
//         test('resolves all dogs in the db', async () => {
//             expect(data).toHaveLength(3)
//         })
//     })
//     describe('getById()', async () => {
//         test('returns the correct dog', () => {
//             const data = await Sample.getById('1')
//             expect(data).toMatchObject({ id: 1, name: 'dalai' })
//         })
//     })
// })
