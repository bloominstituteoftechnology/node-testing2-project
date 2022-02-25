const Snack = require('./snacks/snacks-model');
const db = require('../data/dbConfig');
const request = require('supertest');
const server = require('./server');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('snacks').truncate();
});

describe('snacks model', () => {
    it('shows empty table', async () => {
        const snacks = await db('snacks');
        expect(snacks).toHaveLength(0);
    });
    it('can get by id', async () => {
        const {snack_id} = await Snack.insert({ snack_name: 'Navi Pretzel' });
        const result = await Snack.getById(snack_id);
        expect(result).toHaveProperty('snack_name', 'Navi Pretzel');
    });
});

describe('server endpoints', () => {
    it('call the `up` endpoint', async () => {
        const res = await request(server).get('/');
        
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ api: "up" });
    });

    it('[GET] /snacks', async () => {
        let res = await request(server).get('/snacks');

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(0);

        await Snack.insert({snack_name: 'Navi Pretzel', park_id: 2 });
        res = await request(server).get('/snacks');

        expect(res.body).toHaveLength(1);
    });

    it('should return JSON', async () => {
        const res = await request(server).get('/snacks');

        expect(res.type).toBe('application/json')
    });

    it('should return a list of snacks', async () => {
        await Snack.insert({ snack_name: 'Navi Pretzel' });
        await Snack.insert({ snack_name: 'Kakigori' });
        const res = await request(server).get('/snacks');

        expect(res.body).toHaveLength(2);
    });
    it('[GET] /snacks/:id', async () => {
        let res = await Snack.insert({ snack_name: 'Navi Pretzel' });
        res = await request(server).get(`/snacks/1`);

        expect(res.status).toBe(200);
        expect(res.body.snack_name).toBe('Navi Pretzel');
    });
    it('[POST] /snacks', async () => {
        let res = await request(server)
        .post('/snacks')
        .send({ snack_name: 'BBQ Mac n Cheese' });
        
        expect(res.status).toBe(200);
    });
    it('responds with the newly created snack', async () => {
        const res = await request(server).post('/snacks').send({snack_name: 'Street Corn'})
        expect(res.body).toMatchObject({snack_name: 'Street Corn'})
    })
    it('responds with a 422 if no name in payload', async () => {
        const res = await request(server).post('/snacks').send({})
        expect(res.status).toBe(500)
    })
});