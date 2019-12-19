const Festivals = require('./festivalsModel.js');
const db = require('../data/dbConfig.js');

describe('festivals model', function () {

    beforeEach(async () => {
        await db('festivals').truncate();
    });

    describe('insert()', function () {

        it('should add the festival to the database', async function () {

            await Festivals.insert({ name: 'Burning Man' });
            await Festivals.insert({ name: 'Woodstock' });
            await Festivals.insert({ name: 'Coachella' });
            await Festivals.insert({ name: 'All Good Music Festival' });

            const festivals = await db('festivals');
            expect(festivals).toHaveLength(4);
        });
    });
});