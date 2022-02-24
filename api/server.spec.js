/* eslint-disable no-undef */
const server = require("./server");
const request = require("supertest");
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

describe("[GET] /cars", () => {
  test("responds with all the cars", async () => {
    const res = await request(server).get("/cars");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(4);
  });
});

describe("[GET] /cars/:id", () => {
  test("responds with Civic", async () => {
    const res = await request(server).get("/cars/1");
    expect(res.body).toMatchObject({ id: 1, name: "Civic" });
  });
});

describe("[POST] /cars", () => {
  test("responds with new car", async () => {
    const res = await request(server).post("/cars").send({ name: "CRV" });
    expect(res.body).toMatchObject({ id: 5, name: "CRV" });
  });
  test("responds with status 201", async () => {
    const res = await request(server).post("/cars").send({ name: "CRX" });
    expect(res.status).toBe(201);
  });
});
