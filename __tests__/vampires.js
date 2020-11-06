const supertest = require('supertest')
const server = require('../server')
const db = require('../data/config')
const { application, json } = require('express')
beforeEach(async () => {
	await db.seed.run()
})
afterAll(async () => {
	// close the database connection before the test runner ends,
	// to prevent any warnings about leaks
	await db.destroy()
})
describe('vampire integration tests', () => {
    it('gets a list of vamps', async () => {
        const res = await supertest(server).get('/vampires')
    })
    it('gets vamp by id', async() => {
        const res = await supertest(server).get('/vampires/1')
        expect(res.body.id).toBe(1)
        expect(res.body.name).toBe('Lestat de Lioncourt')
    })
    it('posts a new vampire', async() => {
        const res = await supertest(server)
        .post('/vampires')
        .send({name:'Louis'})
        expect(res.statusCode).toBe(201)
        expect(res.body.name).toBe('Louis')
        expect(res.body.id).toBeDefined()
    })
    it('deletes a vampire', async() => {
        const res = await supertest(server)
        .del('/vampires/1')
        .send({message: 'deleted'})
    })
}) 