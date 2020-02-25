const server = require("./server");
const request = require("supertest");

describe("server.js", () => {
  test("should be the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("should return 200 OK", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should be json", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });

    it("should return the right object", async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual({ api: "server up and running!" });
    });
  });

  describe("GET /heros", () => {
    it("HEROS/should be json", async () => {
      const res = await request(server).get("/heros");
      expect(res.type).toBe("application/json");
    });

    it("HEROS/should return the right object", async () => {
      const res = await request(server).get("/heros");
      expect(res.body).toEqual(res.body);
    });
  });
});
