const db = require('../data/dbConfig')
const Dogs = require('./dogs-model')

describe('dogs-model.js', () => {
    describe('add()', () => {
        it('should add the provided dog into the DB', async () => {
            await Dogs.add({name: 'thom', breed: 'dumbass' })
            const dogs = await db('dogs')
            expect(dogs).toHaveLength(1)
        })
    })

    beforeEach(async () => {
        await db('dogs').truncate()
    })
});