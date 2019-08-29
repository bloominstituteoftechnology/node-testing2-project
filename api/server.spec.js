const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("should return status code 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should return the right structure", async () => {
      const res = await request(server).get("/");
      expect(res.body).objectContaining({
        book: expect.any(String),
        author: expect.any(String)
      });
    });
  });

  describe("DELETE /", () => {
    it("should return status code 201", async () => {
      const res = await request(server).delete("/1");
      expect(res.status).toBe(201);
    });

    it("should return a json message", async () => {
      const res = await request(server).delete("/1");
      expect(res.type).toBe("application/json");
    });
  });
});
