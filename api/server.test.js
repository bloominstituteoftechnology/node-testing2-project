const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");
const Hobbit = require("./hobbits/hobbits-model");

test("is the correct environment", () => {
  expect(process.env.DB_ENV).toBe("testing");
});
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
}); // migrate
beforeEach(async () => {
  await db.seed.run();
}); // truncate and seed fresh data
afterAll(async () => {
  await db.destroy();
}); // disconnect from the db

describe("endpoint testing", () => {
  describe("[POST] /hobbits ", () => {
    test("adds a hobbit to the database", async () => {
      await request(server).post("/hobbits").send({
        name: "smeagol",
      });
      const newlyCreated = await Hobbit.getById(5);
      expect(newlyCreated.id).toEqual(5);
    });
    test("posting a hobbit returns the newly created hobbit", async () => {
      const res = await await request(server).post("/hobbits").send({
        name: "elrond",
      });
      expect(res.body).toMatchObject({ name: "elrond", id: 5 });
    });
  });
  describe("[DELETE] /hobbits/:id", () => {
    test("delete endpoint removes record from database", async () => {
      await request(server).delete("/hobbits/4");
      const result = await db("hobbits");
      expect(result).toHaveLength(3);
    });
    test("returns deleted hobbit", async () => {
      const deletedHobbit = await Hobbit.getById(2);
      await request(server).delete("/hobbits/2");
      expect(deletedHobbit.id).toEqual(2);
    });
  });
});
