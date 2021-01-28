const request = require("supertest");
const db = require("../../data/dbConfig");
const server = require("./stocks-router");

const tesla = { name: "tesla" };
const amc = { name: "amc" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("stocks").truncate();
});
afterAll(async () => {
  await db.destroy();
});

describe("stocks router", () => {
  describe("[GET] /stocks", () => {
    it("responds with status 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
    it('returns the right stocks', async () => {
        let res
        await db('stocks').insert(tesla)
        res = await request(server).get('/')
        expect(res.body).toHaveLength(1)

        await db('stocks').insert(amc)
        res = await request(server).get('/')
        expect(res.body).toHaveLength(2)
    })
  });
});
