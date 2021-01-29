const request = require('supertest');
const server = require('../server');
const db = require('../../data/config');

describe('quote test', () => {
    it('get all quotes', async () => {
        const res = await request(server).get('/quotes')
    })
    it('gets quote by id', async () => {
        const res = await request(server).get('/quotes/1')
        expect(res.body.id).toBe(1)
        expect(res.body.name).toBe('Bob')
    })
    it('post a new quote', async () => {
        const res = await request(server)
            .post('/quotes')
            .send({ name: 'Joe' })
        expect(res.status).toBe(201)
        expect(res.body.name).toBe('Joe')
        expect(res.body.id).toBeDefined()
    })
    it('delete a quote', async () => {
        const res = await requiest(server).del('/quote/1').send({ message: 'deleted' })
    })
})