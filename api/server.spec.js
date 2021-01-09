const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    describe('GET /' , () => {
        test('it returns {api: up}', async () => {
            const expected = {api: 'up'};
            const response = await request(server).get('/');
            expect(response.body).toEqual(expected);
        })
        test('returns json object', async () => {
            const response = await request(server).get('/');
            expect(response.type).toEqual('application/json');       
        })
    })

    describe('POST /api/register', () => {
        test('valid request will return 201 status', async () => {
            const response = await request(server)
                .post('/api/register')
                .send({username: 'marylamb', password: 'qwerty',department: 'music'})
            const expected = 201;

            expect(response.status).toEqual(expected);
        })

        test('invalid request will return 400 status', async () => {
            const response = await request(server)
                .post('/api/register')
                .send({username: 'marylamb', password: '', department: 'music'})
            const expected = 400;

            expect(response.status).toEqual(expected);        
        })
    })

    describe('DEL /remove-user/:id', () => {

        test('returns 200 upon sucessful user deletion', async () => {
            const response = await request(server)
                .delete('/api/remove-user/1')
            const expected = 200;

            expect(response.status).toEqual(expected);  
        })

        test('returns user removed message on success', async () => {
            const response = await request(server)
                .delete('/api/remove-user/1')

            expect(response.body).toEqual({message: 'User removed!'});  
        })
    })
})