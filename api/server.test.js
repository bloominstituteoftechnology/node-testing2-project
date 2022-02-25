const request = require('supertest');
const server = require('./server');
const db = require('../data/db-config');
const users = require('./users/users-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('users').truncate();
});

test('sanity check', () => {
    expect(process.env.NODE_ENV).toBe('testing');
});

describe('test server endpoints', () => {
    test('call the server', async () => {
        const result = await request(server).get('/');
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ api: "up" });
    });

    test('call the Users endpoint', async () => {
        const result = await request(server).get('/api/users');
        expect(result.status).toBe(401);
        expect(result.text).toContain('You shall not pass!');
    });

    test('call the Auth endpoint', async () => {
        const result = await request(server).get('/api/auth');
        expect(result.status).toBe(404);
    });

});