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

    it('cars returned are the correct shape', async () => {
        expect(cars).toMatchObject([
            {
                vin: '1FVACWCS96HV81220',
                make: 'Ford',
                model: 'Focus',
                mileage: 175000,
                title: 'fine',
                transmission: 'manual'
            },
            {
                vin: '3GCEC14X66G218202',
                make: 'Honda',
                model: 'Civic',
                mileage: 1700,
                title: 'fine',
                transmission: 'automatic'
            },
            {
                vin: 'JH4DC4440RS004255',
                make: 'Honda',
                model: 'CRV',
                mileage: 4000,
                title: 'great',
                transmission: 'automatic'
            },
            {
                vin: 'WVGBV7AX6CW559712',
                make: 'Toyota',
                model: 'Rav4',
                mileage: 1,
                title: 'great',
                transmission: 'automatic'
            },
        ])
    })
})

describe('car.getById(id)', () => {
    test('should get correct car by its id', async () => {
        const toyota = await Cars.getById(4)
        expect(toyota).toMatchObject({ make: 'Toyota' })
        const honda = await Cars.getById(3)
        expect(honda).toMatchObject({ make: 'Honda' })
    })
})

describe('Cars.create(car)', () => {
    test('should return 5 cars after creating', async () => {
        await Cars.create({
            vin: '1FTZX1722XKA76091',
            make: 'Dodge',
            model: 'Ram',
            mileage: 1,
            title: 'idk',
            transmission: 'automatic'
        })
        const car = await db('cars')
        expect(car).toHaveLength(5)
    })
    test('inserting a car resolves to the new car', async () => {
        const newCar = await Cars.create({
            vin: '1FTZX1722XKA76091',
            make: 'Dodge',
            model: 'Ram',
            mileage: 1,
            title: 'idk',
            transmission: 'automatic'
        })
        expect(newCar).toMatchObject({ id: 5, make: 'Dodge' })
    })

})
