const request = require('supertest');
const db = require('../data/db-config');
const server = require('./server');

test('it is the correct environment for the tests', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

describe('[GET] /pets', () => {
    it('should return a 200 OK status', async () => {
        const res = await request(server).get('/api/pets');
        expect(res.status).toBe(200);
    });
    it('should return JSON', async () => {
        const res = await request(server).get('/api/pets');
        expect(res.type).toBe('application/json');
    });
});

describe('[POST] /api/pets', () => {
    test('responds with the new pet', async () => {
        const res = await request(server)
            .post('/api/pets')
            .send({ name: 'Lilly' });
        expect(res.body).toMatchObject({ pet_id: 5, name: 'Lilly' });
    }, 600);
    test('responds with a 422 on missing name', async () => {
        const res = await request(server)
            .post('/api/pets')
            .send({ namz: 'Lilly' });
        expect(res.status).toBe(422);
    }, 600);
});


describe('[DELETE] /pets/:id', () => {
    it('returns with a 202 Accepted status', async () => {
        const res = await request(server).delete('/api/pets/1');
        expect(res.status).toBe(202);
    });
    it('deletes an item from the database', async () => {
        await request(server).delete('/api/pets/2');
        const currentPets = await db('pets');
        expect(currentPets).toHaveLength(3);
    });
    it('deletes the CORERCT item from the database', async () => {
        const res = await request(server).delete('/api/pets/2');
        expect(res.body).toMatchObject({ pet_id: 2, name: 'Ella' });
    });
});
