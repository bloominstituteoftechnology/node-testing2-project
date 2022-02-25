const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../server');
const User = require('./users-model');

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

it('correct environment variable for test', () => {
	expect(process.env.NODE_ENV).toBe('testing');
});

describe('user model functions', () => {
	describe('create  user(s)', () => {
		it('adds 1 user to db', async () => {
			let user;
			await User.createUser(user1);
			user = await db('users');
			expect(user).toHaveLength(1);
		});

		it('adds 2 users to db', async () => {
			let users;
			await User.createUser(user1);
			users = await db('users');
			expect(users).toHaveLength(1);

			await User.createUser(user2);
			users = await db('users');
			expect(users).toHaveLength(2);
		});

		it('adds 3 users to db', async () => {
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

		it('user1 inserted username and password', async () => {
			const user = await User.createUser(user1);
			expect(user).toMatchObject({
				user_id: 1,
				username: 'username1',
				password: 'password1',
			});
		});

		it('user2 inserted username and password', async () => {
			const user = await User.createUser(user2);
			expect(user).toMatchObject({
				user_id: 1,
				username: 'username2',
				password: 'password2',
			});
		});

		it('user3 inserted username and password', async () => {
			const user = await User.createUser(user3);
			expect(user).toMatchObject({
				user_id: 1,
				username: 'username3',
				password: 'password3',
			});
		});
	});
});
describe('[POST] /api/register', () => {
	it('[5] creates a new user in the database', async () => {
		await request(server)
			.post('/api/register')
			.send({ username: 'username1', password: '1234' });
		const username1 = await db('users').where('username', 'username1').first();
		expect(username1).toMatchObject({ username: 'username1' });
	}, 750);
	it('[6] new user passwords are saved correctly bcrypted', async () => {
		await request(server)
			.post('/api/register')
			.send({ username: 'username1', password: '1234' });
		const username1 = await db('users').where('username', 'username1').first();
		expect(bcrypt.compareSync('1234', username1.password)).toBeTruthy();
	}, 750);
	it('[7] no cookie gets set by registering (saveUninitialized=false)', async () => {
		const res = await request(server)
			.post('/api/register')
			.send({ username: 'username1', password: '1234' });
		const cookies = setCookie.parse(res, { map: true });
		expect(cookies).toEqual({}); // no SET-COOKIE
	}, 750);
	it('[8] responds with the user (user_id and username)', async () => {
		const res = await request(server)
			.post('/api/register')
			.send({ username: 'username1', password: '1234' });
		expect(res.body).toMatchObject({ user_id: 2, username: 'username1' });
	}, 750);
	it('[9] responds with the proper status code and message on "username taken"', async () => {
		const res = await request(server)
			.post('/api/register')
			.send({ username: 'bob', password: '1234' });
		expect(res.status).toBe(422);
		expect(res.body.message).toMatch(/username taken/i);
	}, 750);
	it('[10] responds with the proper status code and message on too short a password', async () => {
		let res = await request(server)
			.post('/api/register')
			.send({ username: 'username1' });
		expect(res.status).toBe(422);
		expect(res.body.message).toMatch(/ must be longer than 3/i);
		res = await request(server)
			.post('/api/register')
			.send({ username: 'username1', password: '1' });
		expect(res.status).toBe(422);
		expect(res.body.message).toMatch(/ must be longer than 3/i);
	}, 750);
});
