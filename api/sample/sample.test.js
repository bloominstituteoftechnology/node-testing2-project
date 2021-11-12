const server = require('../server')
const Sample = require('./sample')
const request = require('supertest')
const db = require('../../dbConfig')

test('is testing environment', () => {
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

describe('Sample tests', () => {
    describe('getAll()', () => {
        let data
        beforeEach(async () => {
            data = await Sample.getAll() 
        })
        test('resolves all dogs in the db', async () => {
            expect(data).toHaveLength(3)
        })
        test('responds with correct dogs', async () => {
            expect(data).toMatchObject([
                { id: 1, name: 'dalai'},
                { id: 2, name: 'chelsea'},
                { id: 3, name: 'mozie'}
            ])
        })
    })
    describe('getById()', () => {
        let data
        beforeEach(async () => {
            data = await Sample.getById('1') 
        })
        test('returns the correct dog', async () => {
            expect(data).toMatchObject({ id: 1, name: 'dalai' })
        })
        test('returns a real dog', async () => {
            expect(data).toBeTruthy()
        })
    })
    describe('insert()', () => {
        test('posts a new dog', async () => {
            const res = await request(server)
                .post('/sample').send({ name: 'sparky' })
            expect(res.body).toMatchObject({ id: 4, name: 'sparky' })
        })
        test('responds with status 201', async () => {
            const res = await request(server)
                .post('/sample').send({ name: 'sparky' })
            expect(res.status).toBe(201)
        })
    })
    describe('delete()', () => {
        test('deletes the correct dog', () => {

        })
        test('deletes one dog', () => {
            
        })
    })
})
