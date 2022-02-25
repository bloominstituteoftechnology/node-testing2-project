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

describe('server.js', () => {
	describe('[POST] /api/auth/login', () => {
		it('[1] responds with the correct message on valid credentials', async () => {
			const res = await request(server)
				.post('/api/auth/login')
				.send({ username: 'username1', password: '1234' });
			expect(res.body.message).toMatch(/welcome username1/i);
		}, 750);
		it('[2] a "chocolatechip" cookie gets set on the client on valid credentials', async () => {
			const res = await request(server)
				.post('/api/auth/login')
				.send({ username: 'username1', password: '1234' });
			const cookies = setCookie.parse(res, { map: true });
			expect(cookies.chocolatechip).toMatchObject({ name: 'chocolatechip' });
		}, 750);
		it('[3] no cookie gets set on invalid credentials (saveUninitialized=false)', async () => {
			const res = await request(server)
				.post('/api/auth/login')
				.send({ username: 'username1sy', password: 'lady gaga' });
			const cookies = setCookie.parse(res, { map: true });
			expect(cookies).toEqual({}); // no SET-COOKIE
		}, 750);
		it('[4] responds with the correct message on invalid credentials', async () => {
			let res = await request(server)
				.post('/api/auth/login')
				.send({ username: 'username1sy', password: '1234' });
			expect(res.body.message).toMatch(/invalid credentials/i);
			res = await request(server)
				.post('/api/auth/login')
				.send({ username: 'username1', password: '12345' });
			expect(res.body.message).toMatch(/invalid credentials/i);
		}, 750);
	});
	describe('[POST] /api/auth/register', () => {
		it('[5] creates a new user in the database', async () => {
			await request(server)
				.post('/api/auth/register')
				.send({ username: 'sue', password: '1234' });
			const sue = await db('users').where('username', 'sue').first();
			expect(sue).toMatchObject({ username: 'sue' });
		}, 750);
		it('[6] new user passwords are saved correctly bcrypted', async () => {
			await request(server)
				.post('/api/auth/register')
				.send({ username: 'sue', password: '1234' });
			const sue = await db('users').where('username', 'sue').first();
			expect(bcrypt.compareSync('1234', sue.password)).toBeTruthy();
		}, 750);
		it('[7] no cookie gets set by registering (saveUninitialized=false)', async () => {
			const res = await request(server)
				.post('/api/auth/register')
				.send({ username: 'sue', password: '1234' });
			const cookies = setCookie.parse(res, { map: true });
			expect(cookies).toEqual({}); // no SET-COOKIE
		}, 750);
		it('[8] responds with the user (user_id and username)', async () => {
			const res = await request(server)
				.post('/api/auth/register')
				.send({ username: 'sue', password: '1234' });
			expect(res.body).toMatchObject({ user_id: 2, username: 'sue' });
		}, 750);
		it('[9] responds with the proper status code and message on "username taken"', async () => {
			const res = await request(server)
				.post('/api/auth/register')
				.send({ username: 'username1', password: '1234' });
			expect(res.status).toBe(422);
			expect(res.body.message).toMatch(/username taken/i);
		}, 750);
		it('[10] responds with the proper status code and message on too short a password', async () => {
			let res = await request(server)
				.post('/api/auth/register')
				.send({ username: 'sue' });
			expect(res.status).toBe(422);
			expect(res.body.message).toMatch(/ must be longer than 3/i);
			res = await request(server)
				.post('/api/auth/register')
				.send({ username: 'sue', password: '1' });
			expect(res.status).toBe(422);
			expect(res.body.message).toMatch(/ must be longer than 3/i);
		}, 750);
	});
	describe('[GET] /api/auth/logout', () => {
		it('[11] if there is a session it is destroyed so "chocolatechip" cookie not effective anymore', async () => {
			let res = await request(server)
				.post('/api/auth/login')
				.send({ username: 'username1', password: '1234' });
			const { chocolatechip } = setCookie.parse(res, { map: true });
			res = await request(server)
				.get('/api/auth/logout')
				.set('Cookie', `${chocolatechip.name}=${chocolatechip.value}`);
			expect(res.body.message).toMatch(/logged out/i);
			res = await request(server)
				.get('/api/users')
				.set('Cookie', `${chocolatechip.name}=${chocolatechip.value}`);
			expect(res.body.message).toMatch(/you shall not pass/i);
		}, 750);
		it('[12] responds with the proper message if the user was not actually logged in', async () => {
			let res = await request(server).get('/api/auth/logout');
			expect(res.body.message).toMatch(/no session/i);
		}, 750);
	});
	describe('[GET] /api/users', () => {
		it('[13] responds with the proper status code and message on not-logged-in user', async () => {
			const res = await request(server).get('/api/users');
			expect(res.status).toBe(401);
			expect(res.body.message).toMatch(/you shall not pass/i);
		}, 750);
		it('[14] responds with the users if there is a session matching the "chocolatechip" cookie', async () => {
			let res = await request(server)
				.post('/api/auth/login')
				.send({ username: 'username1', password: '1234' });
			const { chocolatechip } = setCookie.parse(res, { map: true });
			res = await request(server)
				.get('/api/users')
				.set('Cookie', `${chocolatechip.name}=${chocolatechip.value}`);
			expect(res.body).toMatchObject([{ user_id: 1, username: 'username1' }]);
		}, 750);
	});
});
