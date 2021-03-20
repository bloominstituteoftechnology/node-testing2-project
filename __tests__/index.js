const supertest = require('supertest');
const server = require('../server');

test('Welcome to Shelby Limited LLC', async () => {
	const res = await supertest(server).get('/');

	//assertions
	expect(res.statusCode).toBe(200);
});
