const Waxed = require('./waxed-products-model')
const db = require('../../data/dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe('Waxed Products Model', () => {
    describe('insert', () => {
        test('creates the new waxed product', async () => {
            await Waxed.insert({ name: 'Base Set Booster Box' })
            const products = await db('waxed_products')
            expect(products).toHaveLength(4)
        })
        test('resolved to the newly created waxed product', async () => {
            const product = await Waxed.insert({ name: 'Base Set Booster Box' })
            expect(product).toMatchObject({ id: 4, name: 'Base Set Booster Box' })
        })
    })
    describe('remove', () => {
        test('removes one waxed product', async () => {
            await Waxed.remove(1)
            const products = await Waxed.getAll()
            expect(products).toHaveLength(2)
        })
        test('removes the correct waxed product', async () => {
            await Waxed.remove(1)
            const products = await Waxed.getAll()
            expect(products[0]).toMatchObject({ id: 2, name: "Kanto Power Box" })
        })
    })
})