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

describe('user model functions', () => {
	describe('create  user(s)', () => {
		it('[2] adds 1 user to db', async () => {
			let user;
			await User.createUser(user1);
			user = await db('users');
			expect(user).toHaveLength(1);
		});

		it('[3] adds 2 users to db', async () => {
			let users;
			await User.createUser(user1);
			users = await db('users');
			expect(users).toHaveLength(1);

			await User.createUser(user2);
			users = await db('users');
			expect(users).toHaveLength(2);
		});

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
		});

		it('[5] user1 inserted username and password', async () => {
			const user = await User.createUser(user1);
			expect(user).toMatchObject({
				user_id: 1,
				username: 'username1',
				password: 'password1',
			});
		});

		it('[6] user2 inserted username and password', async () => {
			const user = await User.createUser(user2);
			expect(user).toMatchObject({
				user_id: 1,
				username: 'username2',
				password: 'password2',
			});
		});

		it('[7] user3 inserted username and password', async () => {
			const user = await User.createUser(user3);
			expect(user).toMatchObject({
				user_id: 1,
				username: 'username3',
				password: 'password3',
			});
		});
	});
});

describe('[POST] /api/auth/login', () => {
	it('[1] responds with the correct message on valid credentials', async () => {
		const res = await request(server)
			.post('/api/auth/login')
			.send({ username: 'bob', password: '1234' });
		expect(res.body.message).toMatch(/welcome bob/i);
	}, 750);
	it('[2] a "chocolatechip" cookie gets set on the client on valid credentials', async () => {
		const res = await request(server)
			.post('/api/auth/login')
			.send({ username: 'bob', password: '1234' });
		const cookies = setCookie.parse(res, { map: true });
		expect(cookies.chocolatechip).toMatchObject({ name: 'chocolatechip' });
	}, 750);
	it('[3] no cookie gets set on invalid credentials (saveUninitialized=false)', async () => {
		const res = await request(server)
			.post('/api/auth/login')
			.send({ username: 'bobsy', password: 'lady gaga' });
		const cookies = setCookie.parse(res, { map: true });
		expect(cookies).toEqual({}); // no SET-COOKIE
	}, 750);
	it('[4] responds with the correct message on invalid credentials', async () => {
		let res = await request(server)
			.post('/api/auth/login')
			.send({ username: 'bobsy', password: '1234' });
		expect(res.body.message).toMatch(/invalid credentials/i);
		res = await request(server)
			.post('/api/auth/login')
			.send({ username: 'bob', password: '12345' });
		expect(res.body.message).toMatch(/invalid credentials/i);
	}, 750);
});
