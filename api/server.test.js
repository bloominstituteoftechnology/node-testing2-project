const server = require('./server')
const request = require('supertest')
const db = require('../data/db-config')
const Users = require('./users/users-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('users').truncate();
});

test('verify we are using the correct environment', ()  => {
    expect(process.env.NODE_ENV).toBe('testing');
});

describe('test the `users` model', () => {
    test('the table is empty', async () => {
        const users = await db('users');
        expect(users).toHaveLength(0);
    });

    test('users get inserted', async () => {
        let result = await Users.insert({ name: 'keisha', id: 5 });
        expect(result).toEqual({ name: 'keisha', id: 5 });
    })

    test('can get by id', async () => {
        const {id} = await Users.insert({ name: 'zion' });
        const result = await Users.getById(id);
        expect(result).toHaveProperty('name', 'zion');
    });
})

describe('test server endpoint', () => {
    test('call the `up` endpoints', async() => {
        const result = await request(server).get('/')
        expect(result.status).toBe(200)
    })
})