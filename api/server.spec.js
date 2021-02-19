const request = require('supertest');
const server = require('./server');

describe('server', () => {
    describe('test server response', () => {
        it('returns a 200 status', async () => {
            const status = 200;
            const response = await request(server).get('/')
            expect(response.status).toEqual(status)
        })
        it('returns a JSON object', async () => {
            const expectedObj = { api: 'up' }
            const response = await request(server).get('/')
            expect(response.body).toEqual(expectedObj)
        })
        it('return object type', async () => {
            const response = await request(server).get('/');
            expect(response.type).toEqual('application/json');
        })
    })
})