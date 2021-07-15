const db = require('../../data/dbConfig.js')
const KrustyKrew = require('./krustykrew-model.js')

test('sanity test', () =>{
    expect(process.env.DB_ENV).toBe('testing')
})

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () =>{
    await db('krustykrew').truncate()
    await  db.seed.run()
})
afterAll(async () => {
    await db.destroy()
})

describe('krustykrew model', () =>{
    describe('getAll',() =>{
        test('returns all krusty krew members in db', async () =>{
            const data = await KrustyKrew.getAll()
            expect(data).toHaveLength(4)
        })
        test('returns the correct krusty krew members with all their props', async () =>{
            const data = await KrustyKrew.getAll()
            expect(data).toMatchObject([
                { "id": 1, "name": "Spongebob" },
                { "id": 2, "name": "Squidward" },
                { "id": 3, "name": "Mr.Krabs" },
                { "id": 4, "name": "Patrick" },
            ])
        })
    })
    describe('getById', () =>{
        test('returns the krusty krew members by the give id', async () =>{
            const spongebob = await KrustyKrew.getById(1)
            expect(spongebob).toMatchObject({"id":1, "name": "Spongebob"})
        })
    })
describe('insert', () =>{
    test('returns the inserted row', async () =>{
        const input = {name:'Plankton'}
        const plankton = await KrustyKrew.insert(input)
        expect(plankton).toMatchObject({"id":5,"name":"Plankton"})

        const data = await db('krustykrew')
        expect(data).toHaveLength(5)
    })
})


})