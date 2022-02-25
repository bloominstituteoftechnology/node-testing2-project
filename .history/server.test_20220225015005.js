const request = require('supertest');
const server = require('./api/server');
const db = require('./data/db-config');

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

describe('Initial Sanity Check', () => {
	it('[7] sanity check', () => {
		expect(true).not.toBe(false);
	});

	it('[8] correct environment variable for test', () => {
		expect(process.env.NODE_ENV).toBe('testing');
	});
});

describe('[GET] /users', () => {
	it('[9] gets all users in the database', async () => {
		await request(server).get('/users');
		const users = await db('users');
		expect(users.length).toBe(6);
	});
	it('[10] should return a 200 status', async () => {
		const res = await request(server).get('/users');
		expect(res.status).toBe(200);
	});

	it('[11] should return JSON', async () => {
		const res = await request(server).get('/users');
		expect(res.type).toBe('application/json');
	}, 10000);

	it('[12] should return list of users', async () => {
		const res = await request(server).get('/users');
		expect(res.body).toHaveLength(6);
	}, 10000);
});

describe('[POST] /users', () => {
	it('[13] creates a new user in the database', async () => {
		await request(server).post('/users').send({ user: 'newuser' });
		expect(res.body).toMatchObject({ name: 'newuser' });
	}, 10000);

	it('[14] should get a 201 status', async () => {
		const res = await request(server).post('/users').send({ user: 'newuser' });
		expect(res.status).toBe(201);
	}, 10000);

	it('[15] should get a 422 if no user in payload', async () => {
		const res = await request(server).post('/users').send({});
		expect(res.status).toBe(422);
	}, 10000);
});
