const Pets = require('./pets-model')
//const db = require('../../data/dbConfig')
const knex = require('knex')
const knexConfig = require('../../knexfile')

const testDb = knex(knexConfig.testing)

beforeAll(async () => {
    await testDb.migrate.rollback(); // so any changes to migration files are picked up
    await testDb.migrate.latest();
  })
beforeEach(async () => {
    await testDb('pets').truncate();
    await testDb.seed.run()
  })
afterAll(async () => {
    await testDb.destroy();
  })

describe('pets model', () => {
    describe('insert', () => {
        it('inserts new pet into db', async () => {
            await Pets.insert({ name: 'Fluffy' })
            const pets = await Pets.getAll()
            console.log(pets)
            expect(pets).toHaveLength(4)
        })
        it('resolves to the inserted pet', async () => {
            let pet = await Pets.insert({ name: 'Fluffy' })
            expect(pet).toMatchObject({ id: 4, name: 'Fluffy'})
        })
    })

    describe('getAll()', () => {
        it('gets a list of all pets in the db', async () => {
            let result = await Pets.getAll()
            expect(result).toHaveLength(3)
        })
    })

    describe('getById()', () => {
        it('can find a pet by id', async () => {
            const cooper = await Pets.getById(1)
            expect(cooper).toMatchObject({ id:1, name:'Cooper' })
        })
    })
})