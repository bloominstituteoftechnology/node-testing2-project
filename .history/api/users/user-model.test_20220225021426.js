const server = require('../server');
const db = require('../../data/db-config');
const User = require('../users/users-model');

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
			await User.add({ name: 'user7' });
			const users = await User.find();
			expect(users.length).toBe(7);
		});

		it('[6]  resolves to newly inserted user', async () => {});
	});
});
