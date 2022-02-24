const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../server');

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

test('correct environment variable for test', () => {
	expect(process.env.NODE_ENV).toBe('testing');
});
