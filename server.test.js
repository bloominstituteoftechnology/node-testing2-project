const request = require('supertest');

const server = require('./server.js');

describe(`server`, function(){
    it(`should get '/'`, function() {
        return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
})

describe('users', function(){
    it('should get /users', function() {
        return request(server)
            .get('/users')
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
})

describe('register', function(){
    it('should register user', function() {
        return request(server)
            .post('/register')
            .send({username: "test123", password: "anything but that"})
            .then(res => {
                expect(res.status).toBe(201);
            })
        })
    })
// describe('delete', function(){
//     it('should delete user', function() {
//         return request(server)
//             .delete('/users/0')
//             .then(res => {
//                 expect(res.status).toBe(200);
//             })
//     })
// })

describe('register', function(){
    it('should register user', function() {
        return request(server)
            .post('/register')
            .send({username: "test123", password: "anything but that"})
            .then(res => {
                expect(res.status).toBe(201);
            })
        })
    })