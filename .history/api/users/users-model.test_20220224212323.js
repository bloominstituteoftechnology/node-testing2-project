const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../server');

test('correct environment variable for test', () => {
	expect(process.env.NODE_ENV).toBe('testing');
});

const user1 = {username: 'username1', password: 'password1'}
const user1 = {username: 'username1', password: 'password1'}