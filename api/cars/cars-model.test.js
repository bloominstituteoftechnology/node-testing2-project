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
    test.todo('should return an array of car objects')
    test.todo('each car should have make, model, trim')
})
describe('[GET] /make', () => {
    test.todo('should return an array of cars that match make')
    test.todo('should not include any cars which do not match make')
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