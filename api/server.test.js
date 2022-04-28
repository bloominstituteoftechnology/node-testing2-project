const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');
const Smash = require('./Smash/smash-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('smash').truncate();
    await db('smash')
        .insert([
            { name: 'Kirby', series: 'Kirby' },
            { name: 'Incineroar', series: 'Pokemon' },
            { name: 'Sora', series: 'Kingdom Hearts' },
        ]);
});

afterAll(async () => {
    await db.destroy();
});

describe('Server Tests', () => {
    test('[1] make sure our environment is set correctly', () => {
        expect(process.env.NODE_ENV).toBe('testing');
    })
    test('[2] server is up', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ api: 'up' })
    })
})