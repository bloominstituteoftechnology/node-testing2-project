const supertest = require("supertest");
const server = require("./server");
const model = require("../users/users-model");
const db = require("../database/connection");

describe("server", () => {
  it("can run", () => {
    expect(true).toBeTruthy();
  });
  describe("GET /", () => {
    it("should return http status 200", () => {
      return supertest(server)
        .get("/")
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.status).toBeTruthy();
        });
    });
  });
  it("should return {api:up}", () => {
    return supertest(server)
      .get("/")
      .then((res) => {
        expect(res.body).toEqual({ api: "up" });
        expect(res.body.api).toBe("up");
        expect(res.body.api).toBeDefined();
      });
  });
});
