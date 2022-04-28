const server = require('./server')
const request = require('supertest')
const db = require('../data/db-config')
const CF = require('./model')


test('sanity check', () => {
    expect(true).toBe(true)
})


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('crossfitters').truncate()
    await db('crossfitters')
        .insert([
            {name: 'Amon Trant'},
            {name: 'Ethan Miles'},
            {name: 'Chris Jones'}
        ])
})

afterAll(async () => {
    await db.destroy()
})

test('server is up', async () => {
    const res = await request(server).get('/')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ api: 'up and running señor' })
})


describe('endpoint tests', () => {
    test('can get all', async() => {
        const res = await CF.getAll()
        expect(res.length).toBe(3)
        expect(res[0].name).toBe('Amon Trant')
    })
    test('can get by id', async() => {
        let res = await CF.getById(0)
        expect(res).not.toBeDefined();
         res = await CF.getById(2)
         expect(res.name).toBe('Ethan Miles')
    })
    test('can insert', async () => {
        let res = await CF.insert({ name: 'Nikki Spina'})
        expect(res).toHaveProperty('name', 'Nikki Spina')
        expect(res.id).toBe(4)
        res = await CF.getAll()
        expect(res.length).toBe(4)
    })
    test('can delete', async () => {
        let res = await CF.remove(1)
        expect(res).toHaveProperty('name', 'Amon Trant')
        res = await CF.getAll()
        expect(res.length).toBe(2)
    })
    test('can update', async() => {
        let res = await CF.update(3, { name: 'Joseph Dappen'})
        expect(res).toEqual({ id: 3, name: 'Joseph Dappen'})
        res = await CF.getAll()
        expect(res.length).toBe(3)
    })
})


