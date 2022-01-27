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

describe("GET /joneses", () => {
  let result;
  beforeEach(async () => {
    result = await request(server).get("/api/joneses");
  });
  test("returns a status 200 OK", async () => {
    expect(result.status).toBe(200);
  });
  test("returns an array of Joneses, correctly formatted", async () => {
    expect(result.body).toHaveLength(8);
    expect(result.body[0]).toMatchObject({
      jones_id: 1,
      first_name: "Jim",
      last_name: "Jones",
    });
  });
});

describe("GET /joneses/:id", () => {
  let result;
  beforeEach(async () => {
    result = await request(server).get("/api/joneses/2");
  });
  test("returns a status 200 OK", async () => {
    expect(result.status).toBe(200);
  });
  test("returns the Dana Jones object, correctly formatted", async () => {
    expect(result.body).toMatchObject({
      jones_id: 2,
      first_name: "Dana",
      last_name: "Jones",
    });
  });
});

describe("POST /joneses", () => {
  let result;
  beforeEach(async () => {
    result = await request(server)
      .post("/api/joneses")
      .send({ first_name: "Cullen", last_name: "Rutherford" });
  });
  test("returns a status 201 OK", async () => {
    expect(result.status).toBe(201);
  });
  test("returns the Dana Jones object, correctly formatted", async () => {
    expect(result.body).toMatchObject({
      jones_id: 9,
      first_name: "Cullen",
      last_name: "Rutherford",
    });
  });
});
