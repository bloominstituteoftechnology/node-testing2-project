const Pets = require('./pets-model');
const db = require('../../../data/db-config');

test('it is the correct environment for the tests', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async () => {
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

describe('Pet db access functions', () => {
    describe('Pets.getAll', () => {
        it('returns all of the pets in the table', async () => {
            const pets = await Pets.getAll();
            expect(pets).toHaveLength(4);
        });
        it('returns the correct pet shape', async () => {
            const pets = await Pets.getAll();
            expect(pets[0]).toHaveProperty('name', 'Buddy');
            expect(pets[1]).toMatchObject({ pet_id: 2, name: 'Ella' });
        });
    });


    describe('Pets.insert', () => {
        it('adds a new pet to the table', async () => {
            const newPet = { pet_id: 5, name: 'Rover' };
            await Pets.insert(newPet);
            const pets = await db('pets');
            expect(pets).toHaveLength(5);
        });
        it('returns the newly created pet', async () => {
            const pet = { pet_id: 5, name: 'Rover' };
            const newPet = await Pets.insert(pet);
            expect(newPet).toMatchObject(pet);
        });
    });

    describe('Pets.remove', () => {
        it('removes a pet from the table', async () => {
            await Pets.remove(1);
            const currentPets = await db('pets');
            expect(currentPets).toHaveLength(3);
        });
        it('returns the deleted pet', async () => {
            const removed = await Pets.remove(1);
            expect(removed).toMatchObject({ pet_id: 1, name: 'Buddy'});
        });
    });
});