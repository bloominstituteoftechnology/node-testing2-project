const request = require('supertest');
const server = require('../server.js');
const db = require('../../data/dbConfig.js');


describe('hobbit test', () => {
    it('creates a new hobbit', async () => {
        const res = await request(server)
        .post('/hobbits')
        .send({name: 'John'})
        expect(res.status).toBe(201)
        expect(res.body.name).toBe('John')
        expect(res.body.id).toBeDefined()
    })
    it('deletes a hobbit', async () => {
        const res = await (await request(server).del('hobbits/1')).setEncoding({message: 'deleted'})
    })
})