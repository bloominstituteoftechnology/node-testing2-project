const db = require('../data/dbConfig');
const Dogs = require('./dogsModel');

describe('Dogs model', () => {
    beforeEach(async () => { // Cleans up table before each test
        await db('dogs').truncate();
    });

    it('Is using testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('Insert method', () => {
        it('Should add dog to database', async () => {
            const records = await db('dogs');
            expect(records).toHaveLength(0);
            await Dogs.insert({ breed: 'Pitbull' });
            const dogs = await db('dogs');
            expect(dogs).toHaveLength(1);
        })

        it('Should add specific dog to database', async () => {
            let dog = await Dogs.insert({ breed: 'Chihuahua' });
            expect(dog.breed).toBe('Chihuahua');
        })
    })
})