
const server = require('./server');
const request = require('supertest'); // npm i supertest -D
require('dotenv').config();

describe('server', () => {
    it('dv env set to server', () =>{
        expect(process.env.DB_ENV).toBe('testing')
    });

    describe('GET /', () =>{
          it('should return 200', () =>{
            return  request(server)
                .get('/')
                .then(res =>{
                    expect(res.status).toBe(200)
                })
          });

          it('should return json', () =>{
               return request(server).get('/api/cars').then(res =>{
                   expect(res.type).toMatch(/json/)
               })
          });

        //   it('should return array', () =>{
        //     return request(server).get('/api/cars').then(res =>{
        //         expect(res.body).toMatch([])
        //     })
        // });
    });
});


