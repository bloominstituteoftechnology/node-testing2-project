const supertest = require('supertest');
const server = require('../server');
const db = require('../data/config');

beforeEach(async () => {
	await db.seed.run();
});

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

afterAll(async () => {
	await db.destroy();
});

describe('Shelby Limitted LCC intergration test', () => {
	it('gets a list of Shelbies', async () => {
		const res = await supertest(server).get('/shelbies');
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect(res.body.length).toBeGreaterThanOrEqual(4);
		expect(res.body[0].name).toBe('Thomas Shelby');
	});

	it('Gets Shelby by Id', async () => {
		const res = await supertest(server).get('/shelbies/1');
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect(res.body.id).toBe(1);
		expect(res.body.name).toBe('Thomas Shelby');
	});

	it('returns 404 when Shelby is not found', async () => {
		const res = await supertest(server).get('/shelbies/100');
		expect(res.statusCode).toBe(404);
	});

	it('creates a Shelby', async () => {
		const res = await supertest(server).post('/shelbies').send({ name: 'Michael Shelby' });
		expect(res.statusCode).toBe(201);
		expect(res.type).toBe('application/json');
		expect(res.body.id).toBeDefined();
		expect(res.body.name).toBe('Michael Shelby');
	});

	it('Deletes a Shelby', async () => {
		const res = await supertest(server).del('/shelbies/4');
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe('In the bleak--');
	});
});
