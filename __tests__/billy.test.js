const supertest = require('supertest')
const server = require('../server')
const db = require('../data/config')



describe('billy test', () => {
    it('gets a list of billy', async () => {
        const res = await supertest(server).get('/billy')
    })
    it('gets billy by id', async() => {
        const res = await supertest(server).get('/billy/1')
        expect(res.body.id).toBe(1)
        expect(res.body.name).toBe('Billy')
    })
    it('posts a new character', async() => {
        const res = await supertest(server)
        .post('/billy')
        .send({name:'Penguin'})
        expect(res.statusCode).toBe(201)
        expect(res.body.name).toBe('Penguin')
        expect(res.body.id).toBeDefined()
    })
    it('deletes a character', async() => {
        const res = await supertest(server)
        .del('/billy/1')
        .send({message: 'deleted'})
    })
}) 