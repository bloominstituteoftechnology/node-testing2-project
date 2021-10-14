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

afterAll(async () => {
    await db.destroy();
});

describe('[GET]', () => {
    let res;
    beforeEach(async () => {
        res = await request(server).get('/api/users');
    });
    it.todo('write test here');
});

describe('[GET]', () => {
    let res;
    beforeEach(async () => {
        res = await request(server).get('/api/users');
    });
    it.todo('write test here');
});
describe('[POST]', () => {
    let res;
    beforeEach(async () => {
        res = await request(server).get('/api/users');
    });
    it.todo('write test here');
});
describe('[PUT]', () => {
    let res;
    beforeEach(async () => {
        res = await request(server).get('/api/users');
    });
    it.todo('write test here');
});
describe('[DELETE]', () => {

    it('we remove the user', async () => {
        const [id] = await db('users').insert({ name: 'tomo', age: 31 })
        let user = await db('users').where('id', id).first();
        expect(user).toBeTruthy()
        await request(server).delete(`/api/users/${id}`)
        user = await db('users').where('id', id).first();
        expect(user).toBeFalsy()
    });
});
