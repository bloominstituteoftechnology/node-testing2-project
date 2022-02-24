const Dogs = require('./dogs/dogs-model');
const db = require('../data/dbConfig');
const request = require('supertest');
const server = require('./server');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('dogs').truncate();
});

test('verify we are using the correct environment', ()  => {
    expect(process.env.NODE_ENV).toBe('testing');
});

describe('test the `dogs` model', () => {
    test('the table is empty', async () => {
        const dogs = await db('dogs');
        expect(dogs).toHaveLength(0);
    });

    test('dogs get inserted', async () => {
        let result = await dogs.insert({ name: 'Clifford' });
        expect(result).toEqual({ name: 'Clifford', id: 1 });
        let dogs = await db('dogs');
        expect(dogs).toHaveLength(1);

        await dogs.insert({ name: 'Bolt' });
        dogs = await db('dogs');
        expect(dogs).toHaveLength(2);
    });

    test('can get by id', async () => {
        const {id} = await dogs.insert({ name: 'Spike' });
        const result = await dogs.getById(id);
        expect(result).toHaveProperty('name', 'Spike');
    });

    test('update some dogs', async () => {
        const [id] = await db('dogs').insert({ name: 'Krpto' });
        let result = await dogs.update(id, { name: 'Scooby' });

        expect(result).toEqual({ id, name: 'Scooby' });
        result = await dogs.getById(id);
        expect(result).toEqual({ id, name: 'Scooby' });
    });

    test('hobbit removal', async () => {
        let result = await Dogs.insert({ name: 'Pluto' });
        result = await Dogs.getById(result.id);
        expect(result).toHaveProperty('name', 'Pluto');
        result = await Dogs.remove(result.id);
        expect(result).toEqual({ id: 1, name: 'Pluto' });
        result = await Dogs.getById(result.id);
        expect(result).not.toBeDefined();
    });
});


describe('test server endpoints', () => {
    test('call the `up` endpoint', async () => {
        const result = await request(server).get('/');
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ api: "up" });
    });

    test('[GET] /dogs', async () => {
        let result = await request(server).get('/dogs');
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
        expect(result.body).toHaveLength(0);

        await dogs.insert({ name: 'Pluto' });

        result = await request(server).get('/dogs');
        expect(result.body).toHaveLength(1);
    });

    test('[GET] /dogs/:id', async () => {
        let result = await Dogs.insert({ name: 'Pluto' });
        result = await request(server).get('/dogs/' + result.id);
        expect(result.body.name).toBe('Pluto');
    });

    test('[POST] /dogs', async () => {
        let result = await request(server)
            .post('/dogs')
            .send({ name: 'Blue' });
        expect(result.status).toBe(201);

        result = await dogs.getById(1);
        expect(result.name).toBe('Blue');
    });

    test('[DELETE] /dogs/:id', async () => {
        let {id} = await dogs.insert({ name: 'Scottie' });
        let result = await request(server).delete('/dogs/' + id);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual({ name: 'Scottie', id: 1 });
        const dogs = await db('dogs');
        expect(dogs).toHaveLength(0);
    });

    test('[PUT] /dogs/:id', async () => {
        let {id} = await Dogs.insert({ name: 'Scottie1' });
        let result = await request(server)
            .put('/dogs/' + id)
            .send({ name: 'Scottie2' });
        expect(result.body).toEqual({ name: 'Scottie2', id });
        let hobbit = await Dogs.getById(id);
        expect(hobbit).toEqual({ name: 'Scottie2', id })
    });
});