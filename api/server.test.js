const db = require('../data/dbConfig');
const request = require('supertest');
const server = require('./server');

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

beforeEach(async () => {
	await db.seed.run();
});

describe('[Get] /friends', () => {
	test('responds with 200 Ok', async () => {
		const res = await request(server).get('/friends');
		expect(res.status).toBe(200);
	});
	test('responds with all the hobbits', async () => {
		const res = await request(server).get('/friends');
		expect(res.body).toHaveLength(4);
	});
});

describe('[POST] /friends', () => {
	const name = { name: 'Nange' };
	test('adds a friend to the database', async () => {
		await request(server).post('/friends').send(name);
		expect(await db('friends')).toHaveLength(5);
	});
	test('responds with the new friend', async () => {
		const res = await request(server).post('/friends').send(name);
		expect(res.body).toMatchObject(name);
	});
});
