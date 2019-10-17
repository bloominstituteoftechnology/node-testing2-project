const request = require('supertest')

const server = require('./server.js');

describe('GET /', () =>{
    //should return http 200
    it('should return 200 http status code', () => {
        return request(server)
            .get('/')
            .then(response => {
                expect(response.status).toBe(200);
        });
    });
    //should return json
    it('should return json', async () => {
        const response = await request(server).get('/');

        //toMatch uses a regular expression to check value
        expect(response.type).toMatch(/json/i)
    });

    // it('toEqual', () => {
    //     expect({}).toBe({})
    //     expect({}).toEqual({})
    //     expect([1, 2, 3]).toEqual([1, 2, 3])
    // })

});