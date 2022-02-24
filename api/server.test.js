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

describe('Testing Model.js Functions', () => {


    test('Test 1: Database table is initially empty ', () => {

        expect(1+1).toEqual(0);
    })

    test('Test 2: Dogs get created with insert function', () => {

        expect(1+1).toEqual(0);
    })

    test('Test 3: Can fetch Dogs', () => {

        expect(1+1).toEqual(0);

    })

    test('Test 4: Can fetch Dogs by ID', () => {

        expect(1+1).toEqual(0);

    })

    test('Test 5: Can update Dogs', () => {

        expect(1+1).toEqual(0);

    })

    test('Test 6: Can remove Dogs', () => {

        expect(1+1).toEqual(0);

    })

    test('Test 7: API call to root /', () => {

        expect(1+1).toEqual(0);

    })

    test('Test 8: API call to [GET] /dogs', () => {

        expect(1+1).toEqual(0);

    })

    test('Test 9: API call to [GET] /dogs/:id', () => {

        expect(1+1).toEqual(0);

    })

    test('Test 10: API call to [POST] /dogs', () => {

        expect(1+1).toEqual(0);

    })




})

