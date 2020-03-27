const request = require("supertest");
const db = require("../data/db-config");
const server = require("../api/server");
const Friends = require("./friends-model");

describe("server.js", () => {
  describe("GET /api/friends", () => {
    it("should return 200 status", async () => {
      const res = await request(server).get("/api/friends");
      expect(res.status).toBe(200);
    });
    it("should return JSON", async () => {
      const res = await request(server).get("/api/friends");
      expect(res.type).toMatch(/json/i);
    });
    it("should return an array", async () => {
      const res = await request(server).get("/api/friends");
      expect(res.body).toEqual([]);
    });
  });
  describe("GED /api/friends/:id", () => {
    it("should return 200 status", async () => {
      await request(server)
        .post("/api/friends")
        .send({ name: "amos" });
      const res = await request(server).get("/api/friends/1");
      expect(res.status).toBe(200);
    });
    it("should return 200 status", async () => {
      await request(server)
        .post("/api/friends")
        .send({ name: "amos" });
      const res = await request(server).get("/api/friends/1");
      expect(res.type).toMatch(/json/i);
    });
    it("should return an object with the correct id", async () => {
      await request(server)
        .post("/api/friends")
        .send({ name: "amos" });
      const res = await request(server).get("/api/friends/1");
      console.log(res.body);
      expect(res.body.id).toBe(1);
    });
    it("should return an object with the correct id", async () => {
      await request(server)
        .post("/api/friends")
        .send({ name: "amos" });
      const res = await request(server).get("/api/friends/1");
      console.log(res.body);
      expect(typeof res.body).toBe("object");
    });
  });
  describe("POST /api/friends", () => {
    it("should return 201 status", async () => {
      const res = await request(server)
        .post("/api/friends")
        .send({ name: "amos" });
      expect(res.status).toBe(201);
    });
    it("should return JSON", async () => {
      const res = await request(server)
        .post("/api/friends")
        .send({ name: "amos" });
      expect(res.type).toMatch(/json/i);
    });
    it("should return object with correct name", async () => {
      const res = await request(server)
        .post("/api/friends")
        .send({ name: "amos" });
      expect(res.body.name).toBe("amos");
    });
    it("should return only one object", async () => {
      const res = await request(server)
        .post("/api/friends")
        .send({ name: "amos" });
      expect(typeof res.body).toBe("object");
    });
  });
  describe("DELETE /api/friends:id", () => {
    it("should return a 200 status", async () => {
      await request(server)
        .post("/api/friends")
        .send({ name: "amos" });
      const res = await request(server).delete("/api/friends/1");
      expect(res.status).toBe(200);
    });
    it("should return JSON", async () => {
      await request(server)
        .post("/api/friends")
        .send({ name: "amos" });
      const res = await request(server).delete("/api/friends/1");
      expect(res.type).toMatch(/json/i);
    });
    it("should return deleted object with correct name", async () => {
      await request(server)
        .post("/api/friends")
        .send({ name: "amos" });
      const res = await request(server).delete("/api/friends/1");
      expect(res.body.name).toBe("amos");
    });
    it("should throw error if sent endpoint with no id", async () => {
      const res = await request(server).delete("/api/friends");
      expect(res.status).toBe(404);
    });
  });
});

beforeEach(async () => {
  await db("friends").truncate();
});
