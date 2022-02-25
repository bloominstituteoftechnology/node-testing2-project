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