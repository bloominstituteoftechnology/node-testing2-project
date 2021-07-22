const server = require('./server');
const response = require('supertest');

describe("server tests", () => {
    it("[0] tests can run", () => {
        expect(1).toBe(1);
    })
    it("[1] server exists", () => {
        expect(server).toBeTruthy();
    })
    it("[2] false endpoint returns 404 error", async() => {
        const res = await response(server).patch("/");
        expect(res.status).toBe(404);
    })
    it("[3] default endpoint returns default message", async() => {
        const res = await response(server).get("/");
        expect(res.body).toMatchObject({ message: "Yip, yip, Appa!" });
    })
})