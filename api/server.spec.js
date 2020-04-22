const request = require("supertest");
const db = require("../data/dbConfig");
beforeEach(async () => {
  await db.seed.run();
});

const server = require("./server");

describe("server", function () {
  describe("GET functions", function () {
    it("should return a status of 200", async function () {
      const response = await request(server).get("/accounts");
      expect(response.status).toBe(200);
    });
    it("should return a status of 404", async function () {
      const response = await request(server).get("/");
      expect(response.status).toBe(404);
    });
    it("should return an array of accounts", async function () {
      const response = await request(server).get("/accounts");
      expect(response.body).toHaveLength(13);
    });
  });

  describe("GET/:id route functions", function () {
    it("should return a status of 200", async function () {
      const response = await request(server).get("/accounts/1");
      expect(response.status).toBe(200);
    });

    it("should return an the specified account", async function () {
      const response = await request(server).get("/accounts/1");
      expect(response.body).toEqual({
        data: {
          id: 1,
          name: "account-01",
          budget: 4000,
        },
      });
    });
  });

  describe("POST route function", function () {
    it("should return a status of 200", async function () {
      const response = await request(server).post("/accounts").send({
        id: 19,
        name: "account-l",
        budget: 1,
      });

      expect(response.status).toBe(201);
    });

    it("should return an array with extra accounts", async function () {
      const response = await request(server).post("/accounts").send({
        id: 16,
        name: "account-z",
        budget: 1,
      });
      expect(typeof response.body).toBe("object");
      expect(response.body).toEqual(expect.arrayContaining([16]));
    });
  });

  describe("DELETE route function", function () {
    it("should return a status of 200 and be the object", async function () {
      const response = await request(server).delete("/accounts/13");

      expect(response.status).toBe(200);
    });
    it("should return an object", async function () {
      const response = await request(server).delete("/accounts/13");

      expect(typeof response.body).toBe("object");
    });
  });
});
