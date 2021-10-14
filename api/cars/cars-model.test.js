const db = require('../../data/dbConfig')
const Cars = require('./cars-model')

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

test('environment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('Car.getAll()', () => {
    let cars
    beforeEach(async () => {
        cars = await Cars.getAll()
    })

    it('returns (3) cars', async () => {
        expect(cars).toHaveLength(4)
    })

    
})