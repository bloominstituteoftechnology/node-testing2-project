const request = require('supertest');
const server = require('./server');

describe('server tests', () => {
    it('should set the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing')
    });
});

describe('GET / on server file', () => {
    it('should return status 200', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
    });
    it('should return jason format', async () => {
        const res = await request(server).get('/');
        expect(res.type).toBe('application/json');
    });
    it('should return Hello from the server!', async () => {
        const res = await request(server).get('/');
        expect(res.body).toEqual('Hello from the server!')
    });
}) 
