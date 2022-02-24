/* eslint-disable no-undef */
const Car = require("./cars-model");
const db = require("../../data/db-Config");
const { cars } = require("../../data/seeds/02-Main");

test("is testing environment", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("Cars model", () => {
  describe("getAll()", () => {
    let data;
    beforeEach(async () => {
      data = await Car.getAll();
    });
    test("resolves all cars in the db", async () => {
      expect(data.length).toBe(4);
      expect(data).toHaveLength(4);
    });
    test("resolves the correct shapes", async () => {
      expect(data).toMatchObject(cars);
    });
  });
  describe("getById()", () => {
    test("returns the correct car", async () => {
      const data = await Car.getById("1");
      expect(data).toMatchObject({ id: 1, name: "Civic" });
    });
  });
});
