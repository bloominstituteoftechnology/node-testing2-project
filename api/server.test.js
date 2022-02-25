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
})