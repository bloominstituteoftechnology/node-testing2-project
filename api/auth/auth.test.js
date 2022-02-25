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

// test('register', () => {
    
// });

// test('login', () => {

// });

// test('logout', () => {

// });
