const supertest = require('supertest')
const server = require('./server');

describe('server.js', () => {
    describe('GET /', () => {
        it('will return status', () => {
            return supertest(server)
                .get('/')
                .then((res) => {
                    expect(res.status).toBe(200);
                });
        });
    });
    it('should return api working message', () => {
        return supertest(server)
            .get('/')
            .then((res) => {
                expect(res.body.data).toBe('Here is a working API');
            });
    });
    describe('POST /authors', () => {
        it('Should return the api status on the authors endpoint', () => {
            return supertest(server)
                .get('/')
                .then((res) => {
                    expect(res.status).toBe(200)
                })
        })
    })
})