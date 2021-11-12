const Houses = require('./houses-model')
const db = require('../../data/db-config')
const { houses } = require('../../data/seeds/001-houses')

test('is testing environment', () => {
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

describe('Houses model', /* NO ASYNC HERE!!! */() => {
	describe('getAll()', () => {
		let data
		beforeEach(async () => {
			data = await Houses.getAll()
		})
		test('resolves all houses in the db', async () => {
			expect(data.length).toBe(4)
			expect(data).toHaveLength(4)
		})
		test('resolves the correct shapes', async () => {
			expect(data).toMatchObject(houses)
			expect(data).toEqual([
				{
					"id": 1,
					"name": "sam"
				},
				{
					"id": 2,
					"name": "frodo"
				},
				{
					"id": 3,
					"name": "pippin"
				},
				{
					"id": 4,
					"name": "merry"
				}
			])
		})
	})
	describe('getById()', () => {
		test('returns the correct hobbit', async () => {
			// hit the function, get hobbit with id = 1
			// assert that the data is { id: 1, name: 'sam' }
			const data = await Houses.getById('1')
			expect(data).toMatchObject({ id: 1, name: 'sam' })
		})
	})
	describe('insert()', () => {

	})
})