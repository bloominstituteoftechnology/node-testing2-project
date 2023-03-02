const db = require('../../data/db-config');
const Car = require('./cars-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run()
})
describe('sanity test', () => {
    test('environment is set to testing', () => {
        expect(process.env.NODE_ENV).toBe('testing');
    })
})
describe('[GET] /', () => {
    test('should return an array of car objects', async () => {
        const result = await Car.findAll()
        expect(result).toHaveLength(5)
        expect(result[0]).toMatchObject({ model: 'ct4' })
        expect(result[1]).toMatchObject({ model: 'ct5' })
        expect(result[2]).toMatchObject({ model: 'canyon' })
        expect(result[3]).toMatchObject({ model: 'sierra' })
        expect(result[4]).toMatchObject({ model: 'yukon' })
    })
    test('each car should have make, model, trim', async () => {
        const result = await Car.findAll()
        expect(result[0]).toHaveProperty('make')
        expect(result[0]).toHaveProperty('model')
        expect(result[0]).toHaveProperty('price')
    })
})
describe('[GET] /make', () => {
    test('should return an array of cars that match make', async () => {
        const result = await Car.findByMake('cadillac')
        expect(result).toHaveLength(2)
        expect(result[0]).toHaveProperty('make')
        for(let i = 0; i < result.length; i++) {
            expect(result[i]).toHaveProperty('make')
            expect(result[i].make).toEqual('cadillac')
        }
    })
    test('should not include any cars which do not match make', async () => {
        const result = await Car.findByMake('cadillac')
        expect(result).toHaveLength(2)
        expect(result[0]).toHaveProperty('make')
        for(let i = 0; i < result.length; i++) {
            expect(result[i]).toHaveProperty('make')
            expect(result[i].make).not.toEqual('ford')
            expect(result[i].make).not.toEqual('gmc')
            expect(result[i].make).not.toEqual('ferrari')
        }
    }) // this one is kinda redundant because I loop through each item in the prev test
})
describe('[POST] /', () => {
    test.todo('should add new car to the db')
    test.todo('should return object containing new car')
})
describe('[PUT] /:id', () => {
    test.todo('should update indicated car in the db')
    test.todo('should return object containing updated car')
})
describe('[DELETE] /:id', () => {
    test.todo('should remove indicated car from the db')
    test.todo('should return object containing deleted car')
})