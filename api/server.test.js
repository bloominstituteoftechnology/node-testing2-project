const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

const flygon = {name: 'Flygon'}
const dragonite = {name: 'Dragonite'}
const lucario = {name: 'Lucario' }

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
            let res = await request(server).post('/pokemon').send(flygon)
            expect(res.status).toBe(201)
        })
        it('responds with new pokemon', async () =>{
            let res = await request(server).post('/pokemon').send(dragonite)
            expect(res.body).toMatchObject({id:1, ...dragonite})
        })
    })
    describe('[Delete] /pokemon/:id', () =>{
        it('responds with 404 status', async () =>{
            let res = await request(server).del('/pokemon/:id')
            expect(res.status).toBe(404)
        })
        it('deletes pokemon with the specified id', async () =>{
            let res;
            const [id] = await db('pokemon').insert(flygon);
            await db('pokemon').insert(dragonite);
            res = await request(server).get('/pokemon');
            expect(res.body).toHaveLength(2);
            await request(server).del(`/pokemon/${id}`);
            res = await request(server).get('/pokemon');
            expect(res.body).toHaveLength(1);
        })
    })
})