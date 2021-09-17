const request =  require('supertest');
const db = require('./data/db-config');
const server = require('./api/server');

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=>{
    await db('flowers').truncate()
})

afterAll(async()=>{
    await db.destroy()
})

it('correct env',()=>{
    expect(process.env.DB_ENV).toBe('testing')
})