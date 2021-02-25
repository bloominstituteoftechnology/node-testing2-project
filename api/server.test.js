const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

const flygon = {name: 'Flygon', pokedex_number: 330 }
const dragonite = {name: 'Dragonite', pokedex_number: 149 }
const lucario = {name: 'Lucario', pokedex_number: 448 }

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=>{
    await db('pokemon').truncate()
})

afterAll(async ()=>{
    await db.destroy()
})

describe('server', () =>{
    describe('[Post] /pokemon', () =>{
        it('responds with 201 status', async () =>{
            const res = await request(server).get('/pokemon')
            expect(res).toBe(201)
        })
    })
})