//import supertest && Server object

const request = require('supertest');
const server = require('../api/server');



describe('server.js', () => {
    it('should be in testng environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', () => {
        it('should return a status 200',  async ()=> {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });
    });

    describe('POST /', () => {
        it('should create a new employee', async ()=> {
            const res = await request(server).post('/');
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
          
        });
    });

    describe('DELETE /:id', () => {
        it('should delete an employee', async ()=> {
            const res = await request(server).delete('/:id');
            expect(res.status).toBe(200);
            expect(res.body).toBe(0);
            expect(res.type).toBe('application/json')
        });
    });

});


