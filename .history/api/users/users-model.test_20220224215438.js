const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../server');
const User = require('./users-model')

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

test('correct environment variable for test', () => {
	expect(process.env.NODE_ENV).toBe('testing');
});

describe('user model functions', () =>{
	describe('create  user(s)', ()=>{
		test('adds 1 user to db', async () => {
			let users 
			await User.createUser(user1)
			users = await db('users')
			expect(users).toHaveLength(1)
		})
		test('adds 2 users to db', async () => {
			let users 
			await User.createUser(user1)
			users = await db('users')
			expect(users).toHaveLength(1)

			await User.createUser(user2)
			users = await db('users')
			expect(users).toHaveLength(2)
		})
		test('adds 3 users to db', async () => {
			let users 
			await User.createUser(user1)
			users = await db('users')
			expect(users).toHaveLength(1)

			await User.createUser(user2)
			users = await db('users')
			expect(users).toHaveLength(2)

			await User.createUser(user3)
			users = await db('users')
			expect(users).toHaveLength(3)
		})
		test('inserted username and password', async () => {
			const user = await User.createUser
		})
	})
})