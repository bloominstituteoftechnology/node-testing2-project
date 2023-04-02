const db = require("../data/dbConfig");
const request = require("supertest");
const server = require("./server");

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run();
})

test("environment is testing", () => {
    expect(process.env.NODE_ENV).toBe("testing");
})

test("sanity", () => {
    expect(1).toBe(1);
})

describe("[GET] /api/coasters", () => {

    test("responds with 200 OK", async () => {
        const res = await request(server).get("/api/coasters");
        expect(res.status).toBe(200);
    })

    test("responds with all the coasters", async () => {
        const res = await request(server).get("/api/coasters");
        expect(res.body).toHaveLength(6);
    })
})