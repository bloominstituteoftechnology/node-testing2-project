const request = require("supertest");

const server = require("../server");

describe("articles router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /api/articles", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/api/articles")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return list of categories", function() {
      return request(server)
        .get("/api/articles")
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });
});
