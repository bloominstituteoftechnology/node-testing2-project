const request = require("supertest");
const server = require("./server");

describe("server", function() {
  describe("GET /", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });

  describe("POST /", function() {
    it("should return server 201 OK", function() {
      const item = { "item-name": "item1" };
      return request(server)
        .post("/", item)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });
});
