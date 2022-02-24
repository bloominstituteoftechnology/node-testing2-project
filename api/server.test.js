const Dogs = require('./dogs/dogs-model');
const db = require('../data/db-config');
const request = require('supertest');
const server = require('./server');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('dogs').truncate();
});

describe('Testing ENV', () => {
    test('Verifying Correct Environment', ()  => {
        expect(process.env.NODE_ENV).toBe('testing');
    });
})

describe('Logic Test', () => {
    test('Sanity Check', () => {
        expect(1+1).toEqual(2);
    })
})

