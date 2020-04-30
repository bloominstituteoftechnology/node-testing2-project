const db = require('../data/dbConfig.js');
const Items = require('./items-model.js');

describe('items model functions', () => {
    it('should find all items', async () => {
        let items = await db('items');
        // expect(items).toHaveLength(4);
    })
    beforeEach(async () => {
        await db('items').truncate();
    });
})