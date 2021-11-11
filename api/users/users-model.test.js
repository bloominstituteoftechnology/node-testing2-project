const User = require('./users-model')
const db = require('../../data/dbConfig')

test('is testing env', () => {
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
    describe('getAll()', () => {
        let data
        beforeEach(async () => {
            data = await User.getAll()
        })
        test('resolves all users in the db', async () => {
            expect(data.length).toBe(3)
            expect(data).toHaveLength(3)
        })
        test('resolves the correct shape', async () => {
            const expectedShape = [
                {id:1, name:"Leo"},
                {id:2, name:"Gabe"},
                {id:3, name:"Boris"}
            ]
            expect(data).toMatchObject(expectedShape)
        })
    })
    describe('getById(id)', () => {
        test('resolves the correct user', async () => {
            const data = await User.getById(1)
            expect(data).toMatchObject({ id:1, name:"Leo" })
        })
    })
    describe('insert(user)', () => {
        test('resolves the new user', async () => {
            const data = await User.insert({ name: "James" })
            expect(data).toMatchObject({ id:4, name: "James" })
        })
    })
})