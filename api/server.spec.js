const db = require('../data/dbConfig');
const server = require('./server');
const request = require('supertest');

// ?? Server test batch
describe('server', () => {
	// ?? Check environment
	test('we are in testing environment', () => {
		expect(process.env.DB_ENV).toBe('testing');
	});

	// ?? POST test batch
	describe('POST /books', () => {
		// ?? set up res to be used in all tests
		let res;
		beforeEach(async () => {
			res = await request(server).post('/');
		});

		test('returns status 200 on successful post', () => {
			return request(server)
				.post('/books')
				.send({ title: 'A Memory of Light' })
				.then((res) => {
					expect(res.status).toBe(201);
				});
		});
		test('database contains posted data', () => {
			return request(server)
				.post('/books')
				.send({ title: 'A New Spring' })
				.then((res) => {
					expect(res.type).toBe(
						'application/json'
					);
				});
		});
	});

	// ?? DELETE test batch
	describe('DELETE /books', () => {
		beforeEach(async () => {
			await db.seed.run();
		});
		test('returns status 200 upon successful deletion', async () => {
			const res = await request(server).delete(
				'/books/1'
			);
			expect(res.status).toBe(200);
		});
		test('returns status 400 with invalid id', async () => {
			const res = await request(server).delete(
				'/books/4'
			);
			expect(res.status).toBe(404);
		});
	});
});
