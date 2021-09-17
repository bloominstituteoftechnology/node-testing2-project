const request =  require('supertest');
const db = require('./data/db-config');
const server = require('./api/server');
const { testing } = require('./knexfile');

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

describe('[1] GET request retrieves data and returns appropriate objects',()=>{
    test('[A] returns an array of all flowers',()=>{
        
    });
});
describe('[2] POST request adds object to database and returns same object',()=>{
    test('',()=>{});
    test('',()=>{});
});
describe('[3] DELETE request removes object from database and returns remaining database',()=>{
    test('',()=>{});
    test('',()=>{});
});



