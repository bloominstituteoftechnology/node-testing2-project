const request = require('supertest');
const server = require('./api/server');
const db = require('./data/db-config');
const User = require('./api/users/users-model');

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
	it('[1] sanity check', () => {
		expect(true).not.toBe(false);
	});

	it('[2] correct environment variable for test', () => {
		expect(process.env.NODE_ENV).toBe('testing');
	});
});

describe('User DB Access Functions', () => {
	describe('user.find()', () => {
		it('[3] resolves all users in the users table', async () => {
			const users = await User.find();
			expect(users.length).toBe(6);
		});

		it('[4] resolves the correct users shape', async () => {
			const users = await User.find();
			expect(users[0]).toHaveProperty('user_id', 1);
			expect(users[0]).toHaveProperty('user', 'user1');
		});
	});
	describe('user.add()', () => {
		it('[5] adds new user to the table', async () => {
			await User.add({ user: 'user7' });
			const users = await User.find();
			expect(users.length).toBe(7);
		});

		it('[6]  resolves to newly inserted user', async () => {});
	});
	describe('user.findById()', () => {
		it('[7] Title here', async () => {});

		it('[8]  Title here', async () => {});
	});
});

describe('title here', () => {
	describe('user.find', () => {});
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
	});

	it('[12] should return list of users', async () => {
		const res = await request(server).get('/users');
		expect(res.body).toHaveLength(6);
	});
});

describe('[POST] /register', () => {
	it('[13] creates a new user in the database', async () => {
		await request(server).post('/register').send({ user: 'user8' });
		const user8 = await db('users').where('user', 'user8').first();
		expect(user8).toMatchObject({ user: 'user8' });
	});

	it('[14] should get a 201 status', async () => {
		const res = await request(server).post('/register').send({ user: 'jojo' });
		expect(res.status).toBe(201);
	});

	it('[15] should get a 422 if no user in payload', async () => {
		const res = await request(server).post('/register').send({});
		expect(res.status).toBe(422);
	});
});
