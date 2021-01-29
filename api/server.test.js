const request = require('supertest');
const server = require('../server');

describe('server', () => {
    describe('test server response', () => {
        it('returns 200 status', async () => {
            const statusCode = 200;
            const response = await request(server).get('/')
            expect(response.status).toEqual(statusCode)
        })
        it('return a JSON object', async () => {
            const expectedBody = { api: 'running' }
            const response = await request(server).get('/')
            expect(response.body).toEqual(expectedBody)
        })
        it('return object type', async () => {
            const response = await request(server).get('/');
            expect(response.type).toEqual('application/json');
        })
    })
})