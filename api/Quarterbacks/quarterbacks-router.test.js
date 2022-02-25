const request = require("supertest");
const db = require("../../data/db-config");
const router = require("./quarterbacks-router");

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
