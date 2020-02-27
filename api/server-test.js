const request = require("supertest");
const server = require("./server.js");

describe("server", () => {
    it("runs the tests", () => {
    expect(true).toBe(true);
});

describe("POST to /api/users", () => {
    it("returns status 200 OK", () => {
        return request(server)
            .post("/api/users", { name: "TEST NAME" })
            .then(res => {
        expect(res.body).toEqual({ id: 1, name: "TEST NAME" });
        });
    });
});
});