const request = require('supertest');
const server = require('../server');
const db = require('../../data/db-config');
const Users = require('../users/users-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db('Users').truncate();
});

test('sanity check', async () => {
    const users = await db('Users');
    expect(users).toHaveLength(0);
});

const newUser = {
    username: 'Foo',
    password: 'Bar-1',
};

test('register', async () => {
    const result = await request(server).post('/api/auth/register').send(newUser);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({username: 'Foo'});
});

test('login', async () => {
    const result = await request(server).post('/api/auth/login').send(newUser);
    expect(result.text).toContain('Welcome Foo!');
});

test('logout', async () => {
    const result = await request(server).get('/api/auth/logout');
    expect(result.status).toBe(200);
    expect(result.text).toContain('logged out');
});
