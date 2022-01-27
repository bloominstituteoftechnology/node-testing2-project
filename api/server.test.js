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

describe("GET Joneses", () => {
  let result;
  beforeEach(async () => {
    result = await request(server).get("/api/joneses");
  });
  test("returns a status 200 OK", async () => {
    expect(result.status).toBe(200);
  });
  test("returns an array of Joneses, correctly formatted", async () => {
      expect(result.body).toHaveLength(8);
      expect(result.body[0]).toMatchObject({ first_name: "Jim", last_name: "Jones" });
  });
});
