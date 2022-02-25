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
	await db('users').truncate();
});

afterAll(async () => {
	await db.destroy();
});

it('[0] sanity check', () => {
	expect(true).not.toBe(false);
});

it('[1] correct environment variable for test', () => {
	expect(process.env.NODE_ENV).toBe('testing');
});

it('[2] resolves all users in the users table', () => {
	expect(process.env.NODE_ENV).toBe('testing');
});

it('[2] resolves the users table', () => {
	expect(process.env.NODE_ENV).toBe('testing');
});

describe('user model functions', () => {
	describe('create  user(s)', () => {
		it('[2] adds 1 user to db', async () => {
			let user;
			await User.createUser(user1);
			user = await db('users');
			expect(user).toHaveLength(1);
		}, 750);

		it('[3] adds 2 users to db', async () => {
			let users;
			await User.createUser(user1);
			users = await db('users');
			expect(users).toHaveLength(1);

			await User.createUser(user2);
			users = await db('users');
			expect(users).toHaveLength(2);
		}, 750);

		it('[4] adds 3 users to db', async () => {
			let users;
			await User.createUser(user1);
			users = await db('users');
			expect(users).toHaveLength(1);

			await User.createUser(user2);
			users = await db('users');
			expect(users).toHaveLength(2);

			await User.createUser(user3);
			users = await db('users');
			expect(users).toHaveLength(3);
		}, 750);

		it('[5] user1 inserted username and password', async () => {
			const user = await User.createUser(user1);
			expect(user).toMatchObject({
				user_id: 1,
				username: 'username1',
				password: 'password1',
			});
		}, 750);

		it('[6] user2 inserted username and password', async () => {
			const user = await User.createUser(user2);
			expect(user).toMatchObject({
				user_id: 1,
				username: 'username2',
				password: 'password2',
			});
		}, 750);

		it('[7] user3 inserted username and password', async () => {
			const user = await User.createUser(user3);
			expect(user).toMatchObject({
				user_id: 1,
				username: 'username3',
				password: 'password3',
			});
		}, 750);
	});
});

describe('[POST] /api/register', () => {
	it('[8] creates a new user in the database', async () => {
		await request(server)
			.post('/api/register')
			.send({ username: 'username1', password: 'password1' });
		const username1 = await db('users').where('username', 'username1').first();
		expect(username1).toMatchObject({ username: 'username1' });
	});
});
