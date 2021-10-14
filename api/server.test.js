const request = require('supertest')
const db = require('../data/db-config');
const server = require('./server')

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

describe('[GET]', () => {
    it.todo('write test here')
})

describe('[GET]', () => {
    it.todo('write test here')
})
describe('[POST]', () => {
    it.todo('write test here')
})
describe('[PUT]', () => {
    it.todo('write test here')
})
describe('[DELETE]', () => {
    it.todo('write test here')
})