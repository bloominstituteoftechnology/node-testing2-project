const Users = require('./users-model')
const db = require('../../data/db-config')
const { users } = require('../../data/seeds/users')

test('is testing the environment', () => {
	expect(process.env.NODE_ENV).toBe('testing')
})

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

describe('Users-model', () => {
	describe('getAll()', () => {
		let data
		beforeEach(async () => {
			data = await Users.getAll()
		})
		test('resolves all users in the db', async () => {
			expect(data.length).toBe(4)
			expect(data).toHaveLength(4)
		})
		test('resolves the correct shapes', async () => {
			expect(data).toMatchObject(users)
			expect(data).toEqual([
				{
					"id": 1,
					"name": "zion"
				},
				{
					"id": 2,
					"name": "auset"
				},
				{
					"id": 3,
					"name": "ausar"
				},
				{
					"id": 4,
					"name": "heru"
				}
			])
		})
	})
	describe('getById()', () => {
		test('returns the correct user', async () => {
			const data = await Users.getById(1)
			expect(data).toMatchObject({ id: 1, name: 'zion' })
		})
	})
})