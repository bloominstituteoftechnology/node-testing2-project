const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/config");

beforeEach(async () => {

});

afterAll( async () => {

});

describe("checks that the API is working", () => {
    it("responds with a hello world", async () => {
        const response = await supertest(server).get("/api");
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body.message).toBe("Hello World");
    });
});