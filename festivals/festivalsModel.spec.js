const Festivals = require('./festivalsModel');
const db = require('../data/dbConfig');

describe('festivals model', function () {

    beforeEach(async () => {
        await db('festivals').truncate();
    });

    describe('insert()', function () {

        it('should add the festival to the database', async function () {
            // call insert, passing a festival object
            await Festivals.insert({ name: 'Burning Man' });
            await Festivals.insert({ name: 'Woodstock' });

            // check the database directly
            const festivals = await db('festivals');
            expect(festivals).toHaveLength(2);
        });
    });
});