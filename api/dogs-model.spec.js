const db = require('../data/dbConfig')
const Dogs = require('./dogs-model')

const testDog = { name: 'dummy', breed: 'pitbull', age: 27 }

describe('dogs-model.js', () => {
    describe('add()', () => {
        it('should add the provided dog into the DB', async () => {
            await Dogs.add({name: 'thom', breed: 'dumbass' })
            const dogs = await db('dogs')
            expect(dogs).toHaveLength(2)
        })
        it('should return the dog that was added into the DB', async () => {
            const dumbDog = {name: 'thom', breed: 'dumbass' }
            const dog = await Dogs.add(dumbDog)
            expect(dog).toEqual(dumbDog)
        })
    })

    describe('get()', () => {
        it('should get dogs from the DB', async () => {
            const dogs = await Dogs.get()
            expect(dogs).toHaveLength(1)
        })
        it('should get a dog with with same values as', async () => {
            const dog = await Dogs.get().first()
            delete dog.id
            expect(dog).toEqual(testDog)
        })
    })

    describe('remove()', () => {
        it('should remove dog from the DB', async () => {
            await Dogs.remove(1)
            const dogs = await db('dogs')
            expect(dogs).toHaveLength(0)
        })
        it('should return dog that was removed from DB', async () => {
            const dog = await Dogs.remove(1)
            delete dog.id
            expect(dog).toEqual(testDog)
        })
    })

    beforeEach(async () => {
        await db('dogs').truncate()
        await db('dogs').insert(testDog)
    })
});