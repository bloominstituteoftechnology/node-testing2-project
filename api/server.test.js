const Penguins = require('./penguins/penguins-model');
const db = require('../data/dbConfig');
const request = require('supertest');
const server = require('./server');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('penguins').truncate();
});

test('verify we are using the correct environment', ()  => {
    expect(process.env.NODE_ENV).toBe('testing');
});

describe('test the `penguins` model', () => {
    test('the table is empty', async () => {
        const penguins = await db('penguins');
        expect(penguins).toHaveLength(0);
    });

    test('Insert new penguin here', async () => {
        let result = await Penguins.insert({ name: 'Jake Guentzal' });
            expect(result).toEqual({ name: 'Jake Guentzal', id: 1 });
        let penguins = await db('penguins');
            expect(penguins).toHaveLength(1);
        await Penguins.insert({ name: 'John Marino' });
            penguins = await db('penguins');
            expect(penguins).toHaveLength(2);
    });

    test('Can get penguin by ID', async () => {
        const {id} = await Penguins.insert({ name: 'Tristan Jarry' });
        const result = await Penguins.getById(id);
            expect(result).toHaveProperty('name', 'Tristan Jarry');
    });

    test('Update the Penguins roster', async () => {
        const [id] = await db('penguins').insert({ name: 'Bryan Rust' });
        let result = await Penguins.update(id, { name: 'Rusty' });

        expect(result).toEqual({ id, name: 'Rusty' });
        result = await Penguins.getById(id);
        expect(result).toEqual({ id, name: 'Rusty' });
    });

    test('Penguin trade / cut from the team, hoser', async () => {
        let result = await Penguins.insert({ name: 'Tristan Jarry' });
        result = await Penguins.getById(result.id);
            expect(result).toHaveProperty('name', 'Tristan Jarry');
        result = await Penguins.remove(result.id);
            expect(result).toEqual({ id: 1, name: 'Tristan Jarry' });
        result = await Penguins.getById(result.id);
            expect(result).not.toBeDefined();
    });
});


describe('Testing the server endpoints', () => {
    test('Testing the "UP" endpoint', async () => {
        const result = await request(server).get('/');
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ api: "up" });
    });

    test('GET /penguins', async () => {
        let result = await request(server).get('/penguins');
            expect(result.status).toBe(200);
            expect(result.body).toBeInstanceOf(Array);
            expect(result.body).toHaveLength(0);

        await Penguins.insert({ name: 'Sidney Crosby' });

        result = await request(server).get('/penguins');
        expect(result.body).toHaveLength(1);
    });

    test('GET /penguins/:id', async () => {
        let result = await Penguins.insert({ name: 'Sidney Crosby' });
        result = await request(server).get('/penguins/' + result.id);
        expect(result.body.name).toBe('Sidney Crosby');

    });

    test('POST /penguins', async () => {
        let result = await request(server)
            .post('/penguins')
            .send({ name: 'Brian Boyle' });
        expect(result.status).toBe(201);

        result = await Penguins.getById(1);
        expect(result.name).toBe('Brian Boyle');
    });


});