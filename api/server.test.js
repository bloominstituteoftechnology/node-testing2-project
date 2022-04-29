const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');
const Smash = require('./Smash/smash-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('smash').truncate();
    await db('smash')
        .insert([
            { name: 'Kirby', series: 'Kirby' },
            { name: 'Incineroar', series: 'Pokemon' },
            { name: 'Sora', series: 'Kingdom Hearts' },
        ]);
});

afterAll(async () => {
    await db.destroy();
});

describe('Server Tests', () => {
    test('[1] make sure our environment is set correctly', () => {
        expect(process.env.NODE_ENV).toBe('testing');
    })
    test('[2] server is up', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ api: 'up' })
    })
})

describe('Model Tests', () => {
    test('[3] getAll', async() => {
        const result = await Smash.getAll();
        expect(result.length).toBe(3);
        expect(result[0]).toMatchObject({ id: 1, name: 'Kirby', series: 'Kirby' });
        expect(result[1]).toMatchObject({ id: 2, name: 'Incineroar', series: 'Pokemon' });
        expect(result[2]).toMatchObject({ id: 3, name: 'Sora', series: 'Kingdom Hearts' });

    });
    test('[4] getById', async () => {
        let result =  await Smash.getById(2);
        expect(result).toBeDefined();
        expect(result.name).toBe('Incineroar');
        expect(result.series).toBe('Pokemon');

        result = await Smash.getById(500);
        expect(result).not.toBeDefined();
    });
    test('[5] add', async () => {
        let result = await Smash.add({ name: 'Falco', series: 'StarFox' })
        expect(result).toBeDefined()
        expect(result).toEqual({ id: 4, name: 'Falco', series: 'StarFox' })

        result = await Smash.getAll();
        expect(result.length).toBe(4);
    });
    test('[6] remove', async () => {
        let result = await Smash.remove(1);
        expect(result).toHaveProperty('name', 'Kirby');
        result = await Smash.getAll();
        expect(result.length).toBe(2);
    });
});

describe('', () => {
    test('[7] GET /smash', async () => {
        const res = await request(server).get('/smash');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(3);
    });
    // test('[8] GET /smash/:id', async () => {});
    // test('[9] POST /smash', async () => {});
    // test('[10] DELETE /smash', async () => {});
})