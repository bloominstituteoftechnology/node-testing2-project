const server = require("../server");
const request = require("supertest");
const db = require("../../data/dbConfig");

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

describe("[GET] /api/phones", () => {
  test("responds with all of the phones", async () => {
    const res = await request(server).get("/api/phones");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
});

describe("[GET] /api/phones/:id", () => {
  test("responds with all of the phones", async () => {
    const res = await request(server).get("/api/phones/1");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      phone_id: 1,
      phone_name: "iphone x",
      company_id: 1,
    });
  });
});

describe("[POST] /api/phones", () => {
  test("responds with new phone", async () => {
    const res = await request(server).post("/api/phones").send({
      phone_name: "random phone name",
      company_name: "disney",
    });
    expect(res.body).toMatchObject({
      phone_id: 4,
      phone_name: "random phone name",
      company_id: 4,
    });
  });
  test("responds with status 201", async () => {
    const res = await request(server).post("/api/phones").send({
      phone_name: "random phone name",
      company_name: "disney",
    });
    expect(res.status).toBe(201);
  });
});
