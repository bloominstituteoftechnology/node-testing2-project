const request = require('supertest')
const db = require('../../data/dbConfig')
const server = require('../server')
const Model = require('./pokemonModel')

const charizard = { name: "charizard" }
const blastoids = { name: "blastoids" }

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db("pokemon").truncate()
})
afterAll(async () => {
    await db.destroy()
})

test('correct env', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

describe('[POST]Testing the create pokemon route', () => {
    test('responds with newly created pokemon', async () => {
        let response;
        response = await request(server).post('/').send(blastoids)
        expect(response.body).toMatchObject({ id: 1, ...blastoids })
        // expect(1)toBe(1)

        response = await request(server).post("/").send(charizard)
        expect(response.body).toMatchObject({ id: 2, ...charizard })
        expect(response.status).toBe(201)
    })
    test('check if pokemon name is not an empty string', async () => {
        let response
        response = await request(server).post('/').send(blastoids)
        const name = response.name
        expect(String(name)).toHaveLength(9)
    })
})

describe('[DELETE] Testing the delete route', () => {
    beforeAll(async () => {

        await db('pokemon').insert({ name: 'pikachu' })
    })
    test('Deleted Item is returned when deleted', async () => {
        // response = await request(server).post('/').send(blastoids)
        const pikachu = await db('pokemon').where('id', 1)
        deleted = await request(server).delete(`/${pikachu.id}`)
        // Model.create(charizard)
        //     .then(response => {
        //         pokemonToDelete = response
        //     })
        //     .catch(err => {
        //         res.status(500).json({ message: err.message })
        //     })
        // let test
        // test = await Model.remove(pokemonToDelete)
        expect(deleted).toMatchObject({ id: 1, ...pikachu })
    })
})
