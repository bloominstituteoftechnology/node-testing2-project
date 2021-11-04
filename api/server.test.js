const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

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


describe('[GET] /cars', () => {
    let res
    beforeEach(async () => {
        res = await request(server).get('/cars')
    })
    test('responds with 200 OK', async () => {
        expect(res.status).toBe(200)
    })
    it('responds with all (4) of cars', async () => {
        expect(res.body).toHaveLength(4)
    })
    it('cars returned are the correct shape', async () => {
        expect(res.body).toMatchObject([
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

describe('[POST] /cars', () => {
    let res
    beforeEach(async () => {
        res = await request(server).post('/cars').send({
            vin: '1FTZX1722XKA76091',
            make: 'Dodge',
            model: 'Ram',
            mileage: 1,
            title: 'idk',
            transmission: 'automatic'
        })
    })

    test('responds with 201 CREATED', () => {
        expect(res.status).toBe(201)
    })

    test('causes car to be added to the db ', async () => {
        const cars = await db('cars')
        expect(cars).toHaveLength(4)
    })
})
