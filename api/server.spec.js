const supertest = require("supertest");
const server = require("./server");

describe("server.js", () => {
  describe("GET /", () => {
    it("Should return 200 ok", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
  it("should return api working", () => {
    return supertest(server)
      .get("/")
      .then((res) => {
        expect(res.body.data).toBe("api working");
      });
  });
  describe("GET /Philosopgers", () => {
    it("Should return the philosophers endpoint api status", () => {
      return supertest(server)
        .get("/philosophers")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("Should get the api body", () => {
      return supertest(server)
        .get("/philosophers")
        .then((res) => {
          expect(res.body.Data).toEqual([
            {
              id: 24,
              name: "Socrates",
            },
          ]);
        });
    });
  });
});
