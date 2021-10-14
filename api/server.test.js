const request = require('supertest');
const db = require('../data/db-config');
const server = require('./server');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async () => {
    await db.seed.run();
});

describe('[GET] /pets',  () => {
    it('should return a 200 OK status', async () => {
        const res = await request(server).get('/api/pets');
        expect(res.status).toBe(200);
    });
    it('should return JSON', async () => {
        const res = await request(server).get('/api/pets');
        expect(res.type).toBe('application/json');
    });
});