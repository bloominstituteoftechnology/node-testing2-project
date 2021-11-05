const Dwarfs = require('./dwarf-model')
const db = require('../dbConfig')

// fake seed data
const frodo = {name: 'frodo'}
const  sam = {sam: 'sam'}

// run these before all test 
beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('dwarfs').truncate()
})

afterAll(async () => {
    await db.destroy()
})

it('correct env', () => {
    expect(process.env.DB_ENV).toBe('testing')
})
// grouping the test 
describe("dwarfs model", () => {
    // goes with the insert model function
    describe('insert function', () =>{
        it('adds a dwarfs to the db', async () => {
            let all
            await Dwarfs.insert(frodo)
            all = await db('dwarfs')
        // toHaveLength checks the amount of key value pairs
            expect(all).toHaveLength(1)

            
            await Dwarfs.insert(sam)
            all = await db('dwarfs')
            expect(all).toHaveLength(2)
        })
        it('values of dwarfs from db', async () => {
            const dwarfs = await Dwarfs.insert(frodo)
            expect(dwarfs).toMatchObject({id:1, ...frodo})
        })
    })
    describe('updare function', () => {
        it('updates the dwarfs', async () => {
            const [id] = await db('dwarfs').insert(frodo)
            await Dwarfs.update(id, {name: 'FRODO'})
            const updated = await db('dwarf').where({id}).first()
            expect(updated.name).toBe('FRODO')
        })
    })
    it('check updated dwarfs', async() => {
        const [id] = await db('dwarfs').insert(frodo)
        await Dwarfs.update(id, {name: 'FRODO'})
        const updated = await db('dwarfs').where({id}).first()
        expect(updated).toMatchObject({id:id, name:'FRODO'})
    })
})