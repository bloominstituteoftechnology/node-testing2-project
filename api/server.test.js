const server = require('./server')
const request = require('supertest')
const db = require('../data/db-config')

beforeAll(async () => {
	await db.migrate.rollback()
	await db.migrate.latest()
})
beforeEach(async () => {
	await db.seed.run()
})
afterAll(async () => {
	await db.destroy()
})

describe('[GET] / houses', () => {
	test('respondes with all the houses', async () => {
		const res = await request(server).get('/houses')
		expect(res.status).toBe(200)
		expect(res.body).toHaveLength(4)
	})
})

describe('[GET] /houses/:id', () => {
	test('Responds with sam', async () => {
		const res = await request(server).get('/houses/1')
		expect(res.body).toMatchObject({ id: 1, name: 'sam' })
	})
})

describe('[POST] /houses', () => {
	test('responds with new house', async () => {
		const res = await request(server)
			.post('/houses').send({ name: 'bilbo' })
		expect(res.body).toMatchObject({ id: 5, name: "bilbo" })
	})
	test('responds with status 201', async () => {
		const res = await request(server)
			.post('/houses').send({ name: 'bilbo' })
		expect(res.status).toBe(201)
	})
})