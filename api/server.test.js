const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

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

describe("[GET] /games", () => {
  let res
  beforeEach(async () => {
    res = await request(server).get("/api/games")
  })
  it("[10]gets a 200", async () => {
    expect(res.status).toBe(200)
  })
})
