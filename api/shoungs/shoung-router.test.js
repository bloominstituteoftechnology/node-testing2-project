const Shoungs = require('./shoung-model');
const db = require('../../data/db-config');
const request = require('supertest');
const router = require('./shoung-router');

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('shoungs').truncate();
});

test('verify we are using the correct environment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
});

// describe('test server endpoint', () => {
//     // test('verify the "/" endpoint', async () => {
//     //     const result = await request(router).get('/');
//     //     expect(result.status).toBe(200);
//     //     expect(result.body).toEqual({ api: 'up' });
//     // });

//     test('[GET] /shoungs', async () => {
//         let result = await request(router).get('/');
//         expect(result.status).toBe(200);
//         expect(result.body).toBeInstanceOf(Array);
//         expect(result.body).toHaveLength(0);
//     })
// })
