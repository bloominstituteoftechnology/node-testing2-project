const request = require('supertest');
const server = require('./server.js');

describe('server.js', function () {

    describe("environment", function () {

        it("should say environment is testing", function () {
            expect(process.env.DB_ENV).toBe("testing")
        });

    });

    describe('GET /', function () {
        it('should return a 200 OK', function () {

            return request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it("should return a JSON", function () {

            return request(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });

        it("should return {api: 'up'}", function () {

            return request(server)
                .get("/")
                .then(res => {
                    expect(res.body.api).toBe("up");
                });
        });

    });

});