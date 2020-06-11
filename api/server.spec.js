const request = require('supertest');
const db = require('../data/dbConfig')
const Dogs = require('./dogs-model')

const testDog = { name: 'dummy', breed: 'pitbull', age: 27 }

// supertest simulates requests to server, much like postman, but automated.

const server = require('./server.js'); 

describe('server.js', () => {
    it('should set the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    describe('GET /', () => {
        // things we can test
        // code, type, body shape/structure
        it('should return 200 OK', async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200)
        })

        it('should return 200 using then/catch', () => {
            return request(server).get('/')
            .then(res => expect(res.status).toBe(200))
        })

        it('should return {api: "up" }', async () => {
            const res = await request(server).get('/')
            expect(res.body).toEqual({ api: 'up' })
        })
    })
});