const supertest = require("supertest");
const server = require("./server");
const Hobbits = require("../hobbits/hobbitsModel");
const db = require("../data/db-config");

afterEach(async () => {
  await db("hobbits").truncate();
});

describe("server", () => {
  it("can run the test", () => {
    expect(true).toBeTruthy();
  });

  describe("should post a new hobbit to /hobbits", () => {
    it("should return new hobbit obj", async () => {
      await Hobbits.add({ name: "danial" });

      const hobbits = await db("hobbits");

      expect(hobbits).toHaveLength(1);
    });
  });

  describe("status code should be 201", () => {
    it("should return status code 201", async () => {
      const res = await supertest(server)
        .post("/hobbits")
        .send({ name: "jonny " });

      expect(res.status).toBe(201);
    });
  });

  describe("deleting", () => {
    it("remove a hobbit from the database", async () => {
      await Hobbits.add({ name: "danial" });
      return supertest(server)
        .delete("/hobbits/1")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("get 404 not found status", () => {
    it("get 404 not found", () => {
      return supertest(server)
        .delete("/hobbits/2")
        .then((res) => {
          expect(res.status).toBe(404);
        });
    });
  });
});
