const db = require('../data/db-config.js');
const Legends = require('./legendsModel.js');

describe('legends model', () => {
    describe('insert', () => {
        beforeEach(async () => {
            await db('legends').truncate();
        });

        it('should insert the legends provided', async () => {
            await Legends.insert({ name: 'Wendy' });
            await Legends.insert({ name: 'Robby' });

            const legends = await db('legends');
            expect(legends).toHaveLength(2);
        });

        it('should return the legend we inserted', async () => {
            let legend = await Legends.insert({ name: 'Wendy' });
            expect(legend.name).toBe('Wendy');

            legend = await Legends.insert({ name: 'Robby' });
            expect(legend.name).toBe('Robby');
        });
    });
})
