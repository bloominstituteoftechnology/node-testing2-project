const db = require('../data/db.config');
const Cars = require('./carsModel');

describe('Cars model', () => {
    beforeEach(async () => {
        await db('cars').truncate()
    })

    it('Is using testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('Insert method', () => {
        it('should add car to database', async () => {
            const records = await db('cars');
            expect(records).toHaveLength(0);
            await Cars.insert({ make: 'GMC' });
            const cars = await db('cars');
            expect(cars).toHaveLength(1);
        })

        it('should add specific car to database', async () => {
            await Cars.remove(1);
            expect(cars).toHaveLength(0);
        })

        it('should only remove car when ID is provided', async () => {
            Cars.insert({ make: 'ford' })
            await Cars.remove()
            const carrrs = await db('cars')
            expects(carrrs).toHaveLength(1)
        })
    })
})