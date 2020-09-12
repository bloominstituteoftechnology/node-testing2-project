const supertest = require('supertest');
const server = require('../api/server');

describe('authentication route tests', () => {
    it('POST /register', async () => {
        const res = await supertest(server)
            .post('/api/auth/register')
            .send({
                username: 'Cris',
                password: '12345',
                email: 'example@website.com'
            });

        expect(res.statusCode).toBe(201);
        expect(res.type).toBe('application/json');
        expect(res.body.username).toBe('Cris');
    });

    //already registered user
    it('POST /register', async () => { 
        const res = await supertest(server)
            .post('/api/auth/register')
            .send({
                username: 'Cris',
                password: 'password',
                email: 'example123@website.com'
            });

        expect(res.statusCode).toBe(409);
    });

    it('POST /login', async () => {
        const res = await supertest(server)
            .post('/api/auth/login')
            .send({
                username: 'Cris',
                password: '12345'
            });

        expect(res.statusCode).toBe(200);
    })

    //unsuccessful login
    it('POST /login', async () => {
        const res = await supertest(server)
            .post('/api/auth/login')
            .send({
                username: 'Cris',
                password: 'password'
            });

        expect(res.statusCode).toBe(401);
    });
});