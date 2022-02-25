const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db-config');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db('Users').truncate();
});

afterAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db('Users').truncate();
});

test('sanity check', async () => {
    const users = await db('Users');
    expect(users).toHaveLength(0);
});

test('unauthorized user cannot access user list', async () => {
    const newUser = {
        username: 'Foo',
        password: 'Bar-1',
    };
    await request(server).post('/api/auth/register').send(newUser);
    await request(server).post('/api/auth/login').send(newUser);
    const result = await request(server).get('/api/users');
    expect(result.status).toBe(401);
    expect(result.text).toContain("You shall not pass!");
});