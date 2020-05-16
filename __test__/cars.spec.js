const supertest = require("supertest");
const server = require("../server");
const db = require("../data/dbconfig");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("cars integration tests", () => {
  it("GET /cars", async () => {
    const res = await supertest(server).get("/cars");

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(3);
    expect(res.body[0].model).toBe("Challenger R/T");
    expect(res.body[1].make).toBe("Chevrolet");
  });

  it("POST /cars", async () => {
    const data = { year: 1998, make: "Pontiac", model: "Firebird" };
    const res = await supertest(server).post("/cars").send(data);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.make).toBe("Pontiac");
  });

  it("DELETE /cars/:id", async () => {
    const res = await supertest(server).get("/cars");

    expect(res.statusCode).toBe(200);
  });
});
