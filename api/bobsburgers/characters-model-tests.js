const Characters = require('./characters-model')
const db = require('../../data/db-config')

test('NODE_ENV is correct', () => {
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

test('Characters test', async () => {
    const characters = await Characters.getAll()
    expect(characters).toHaveLength(5)
})

describe('Characters model', () => {
    let characters
    beforeEach(async () => {
        characters = await Characters.getAll
    })
    test('Returns all characters', () => {
        expect(characters).toHaveLength(5)
    })
    test('Returns characters with name and id', () => {
        expect(characters[0]).toMatchObject({ name: 'Bob Belcher '})
    })
})
describe('Insert new character', () => {
    let newCharacter = { id = 6, name = 'Regular Size Rudy' }
    let result 
    beforeEach(async () => {
        result = await Characters.insert(newCharacter)
    })
    test('db gets updated with new character', async () => {
        const insertedCharacter = await db('movies')
        .where('id', 6)
        .first()
        expect(insertedCharacter).toMatchObject({ id: 6, name: 'Regular Size Rudy' })
    })
    test('resolves the newly created character', async () => {
        expect(result).toMatchObject({ id: 6, name: 'Regular Size Rudy' })
    })
})