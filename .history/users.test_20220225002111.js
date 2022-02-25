const request = require('supertest');
const server = require('./api/server');
const db = require('./data/db-config');
const User = require('./api/users/users-model');

const user1 = { username: 'username1', password: 'password1' };
const user2 = { username: 'username2', password: 'password2' };
const user3 = { username: 'username3', password: 'password3' };

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
			expect(users[0]).toHaveProperty('username', 'username1');
		});
	});
	describe('user.add()', () => {
		it('[5] adds new user to the table', async () => {
			await User.add({ username: 'username7', password: 'password7' });
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

describe('[GET] /api/users', () => {
	it('[9] gets all users in the database', async () => {
		await request(server).get('/api/users');
		const users = await db('users');
		expect(users.length).toBe(6);
	});
});

describe('[POST] /api/register', () => {
	it('[10] creates a new user in the database', async () => {
		await request(server)
			.post('/api/register')
			.send({ username: 'username1', password: 'password1' });
		const username1 = await db('users').where('username', 'username1').first();
		expect(username1).toMatchObject({ username: 'username8' });
	});

	it('[10] creates a new user in the database', async () => {
		await request(server)
			.post('/api/register')
			.send({ username: 'username9', password: 'password9' });
		const username9 = await db('users').where('username', 'username9').first();
		expect(username1).toMatchObject({ username: 'username1' });
	});
});
