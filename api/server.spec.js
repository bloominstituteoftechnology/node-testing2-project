const request = require('supertest');
const server = require('./server');

describe('GET /', () => {
    it('should return 200', () => {
        return request(server).get('/').then(res => {
            expect(res.status).toBe(200)
        });
    });

    it('should return KSON', async () => {
        const response = await request(server).get('/');
        expect(response.type).toMatch(/json/i);
    });
    it('should return {api: "up', () => {
        return request(server).get('/').then(res => {
            expect(res.body).toEqual({ api: "Up" });
        });
    });
})