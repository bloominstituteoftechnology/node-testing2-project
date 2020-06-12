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
        it('should return a JSON object from the index route', async () => {
            const response = await request(server).get('/');
      
            expect(response.type).toEqual('application/json');
          });
    })
    describe('GET /api/dogs', () => {
        it('should return status code 200', async () => {
            const res = await request(server).get('/api/dogs')
            expect(res.status).toBe(200)
        })
        it('should return status code 404', async () => {
            await Dogs.remove(1)
            const res = await request(server).get('/api/dogs')
            expect(res.status).toBe(404)
        })
        it('should return an expected JSON object', async () => {
            const res = await request(server).get('/api/dogs')
            delete res.body[0].id
            expect(res.body[0]).toEqual(testDog)
        })
    })
    beforeEach(async () => {
        await db('dogs').truncate()
        await db('dogs').insert(testDog)
    })
});