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


    test('Test 1: Database table is initially empty ', async () => {
        const dogs = await db('dogs');
        expect(dogs).toHaveLength(0);
    })

    test('Test 2: Dogs get created with insert function', async () => {

        let result = await Dogs.insert({ name: 'Lulu' });
        expect(result).toEqual({ name: 'Lulu', id: 1 });
        let dogs = await db('dogs');
        expect(dogs).toHaveLength(1);

        await Dogs.insert({ name: 'Cooper' });
        dogs = await db('dogs');
        expect(dogs).toHaveLength(2);

    })

    test('Test 3: Can fetch Dogs', async () => {

        await Dogs.insert({ name: 'Lulu' });
        await Dogs.insert({ name: 'Mumu' });
        await Dogs.insert({ name: 'Cooper' });
        await Dogs.insert({ name: 'Sally' });
        const dogs = await Dogs.getAll()
        expect(dogs).toHaveLength(4)

    })

    test('Test 4: Can fetch Dogs by ID', async () => {

        const {id} = await Dogs.insert({ name: 'Buddy Bear' });
        const result = await Dogs.getById(id);
        expect(result).toHaveProperty('name', 'Buddy Bear');

    })

    test('Test 5: Can update Dogs', async () => {

        const [id] = await db('dogs').insert({ name: 'Smiley' });
        let result = await Dogs.update(id, { name: 'Danny' });
        expect(result).toEqual({ id, name: 'Danny' });
        result = await Dogs.getById(id);
        expect(result).toEqual({ id, name: 'Danny' });

    })

    test('Test 6: Can remove Dogs', async () => {

        let result = await Dogs.insert({ name: 'Murph' });
        result = await Dogs.getById(result.id);
        expect(result).toHaveProperty('name', 'Murph');
        result = await Dogs.remove(result.id);
        expect(result).toEqual({ id: 1, name: 'Murph' });
        result = await Dogs.getById(result.id);
        expect(result).not.toBeDefined();
    })

    test('Test 7: API call to root /', async () => {

        const result = await request(server).get('/');
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ api: "up" });

    })

    test('Test 8: API call to [GET] /dogs', async () => {

        let result = await request(server).get('/dogs');
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
        expect(result.body).toHaveLength(0);

        await Dogs.insert({ name: 'Mimi' });

        result = await request(server).get('/dogs');
        expect(result.body).toHaveLength(1);
    })

    test('Test 9: API call to [GET] /dogs/:id', async () => {

        let result = await Dogs.insert({ name: 'Buddy' });
        result = await request(server).get('/dogs/' + result.id);
        expect(result.body.name).toBe('Buddy');

    })

    test('Test 10: API call to [POST] /dogs', async () => {

        let result = await request(server)
            .post('/dogs')
            .send({ name: 'Doge' });

        expect(result.status).toBe(201);

        result = await Dogs.getById(1);
        expect(result.name).toBe('Doge');

    })

})

