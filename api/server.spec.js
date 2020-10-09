const server = require("./server.js");
const request = require("supertest");

describe("server.js", () => {
  test("Inside testing enviroment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    test("should return 200 OK", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    test("should be json", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });
  });

  describe("POST /", () => {
    test("should return 201 OK", async () => {
      const res = await request(server)
        .post("/")
        .send({ make: "hyundai", model: "elantra", year: 2000 });
      expect(res.status).toBe(201);
      expect(res.type).toBe("application/json");
    });
  });

  describe("DELETE /", () => {
    test("should return 201 OK", async () => {
      const res = await request(server).delete("/1");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
    });
  });

  describe("PUT /", () => {
    test("should return 201 OK", async () => {
      const res = await request(server)
        .put("/1")
        .send({ make: "nissan", model: "skyline", year: 1997 });
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
    });
  });
});
