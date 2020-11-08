const supertest = require("supertest");
const server = require("../server");
const db = require("../data/config");

// run the seeds before every single test,
// so each one can have a fresh start
beforeEach(async () => {
  await db.seed.run();
});

// this is a jest hook that will run after all the tests in this file have ran
afterAll(async () => {
  // close the database connection before the test runner ends,
  // to prevent any warnings about leaks
  await db.destroy();
});

describe("cakes integration tests", () => {
  it("gets a list of cakes", async () => {
    const res = await supertest(server).get("/cakes");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.length).toBeGreaterThanOrEqual(4);
    expect(res.body[0].name).toBe("Mint Chocolate Chip");
  });

  it("gets a single cake by ID", async () => {
    const res = await supertest(server).get("/cakes/2");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.id).toBe(2);
    expect(res.body.name).toBe("Triple Chocolate");
  });

  it("returns error for a cake that doesn't exist", async () => {
    const res = await supertest(server).get("/cakes/50");
    expect(res.statusCode).toBe(404);
  });

  it("creates a new cake", async () => {
    const res = await supertest(server)
      .post("/cakes")
      .send({ name: "Original", base_flavor: "yellow" });
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe("Original");
    // we don't know exactly what the new ID will be,
    // just make sure something was generated
    expect(res.body.id).toBeDefined();
  });
});
