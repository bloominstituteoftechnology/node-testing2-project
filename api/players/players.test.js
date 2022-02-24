const model = require("./players-model");
const db = require("../../data/dbConfig");
const request = require("supertest");
const server = require("./players-router");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("players").truncate();
});

describe("test the models", () => {
  test("test the the data is empty", async () => {
    let result = await db("players");
    expext(result).toHaveLength(1);
  });
});
