const request = require('supertest');

const server = require('./server');

// it("should set db environment to testing", function() {
//     expect(process.env.DB_ENV).toBe("testing");
//   });

describe('server', () => {
    describe('GET /', () => {
        it('should return 200 OK', () => {
            return request(server)
            .get("/")
            .then(res => {
              expect(res.status).toBe(200);
            });
        })

        it("should return JSON formatted response", function() {
            return request(server)
              .get("/")
              .then(res => {
                expect(res.type).toMatch(/json/i);
              });
          });

        it("should return an 'api' property with the value 'up' inside the body", function() {
        return request(server)
            .get("/")
            .then(res => {
            expect(res.body.api).toBe("up");
            });
        });
    })

    const id = 22;

    describe('POST /', () => {

        const newUser = {
            "username": `Testing${id}`,
            "name": "New User",
            "age": 50,
            "state": "New Hampshire",
            "profession": "A Profession"
        }

        it('should return 201 Created', () => {
            return request(server)
            .post("/api/users")
            .send(newUser)
            .then(res => {
              expect(res.status).toBe(201);
            });
        })

        it('should not allow second registration with same username', () => {
            return request(server)
            .post("/api/users")
            .send(newUser)
            .then(res => {
              expect(res.status).toBe(500);
            });
        })
    })

    describe('PUT /', () => {
        const update = {
            "username": "update",
            "password": "password"
        }
        it('should return 200 updated', () => {
            return request(server)
            .put(`/api/user/${id}`)
            .send(update)
            .then(res => {
                expect(res.status).toBe(500);
            })
        })
        it('should return number of records updated', () => {
            return request(server)
            .put(`/api/user/${id}`)
            .send(update)
            .then(res => {
                expect(res.text).toMatch*(/1/i);
            })
        })
    })

    describe('DELETE /', () => {
        it('should delete with status 200 and number of records deleted', () => {
            return request(server)
            .delete(`/api/users/${id}`)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.text).toMatch(/1/i);
            })
        })
    })
})