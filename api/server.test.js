const db = require("../data/dbConfig")
const server = require('./server')
const request = require("supertest")

const URL = '/api/cars';

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
})

describe("[0] Sanity Test", () => {
    test("[a] test suite works", () => {
        expect(1).toBe(1);
    });
});

describe("[Get]", () => {
    test("[a] Status 200 Recieved", async () => {
        const res = await request(server).get(`${URL}`);
        expect(res.status).toBe(200)
    })
    test("[b] Correct first entry ", async () => {
        const res = await request(server).get(`${URL}/1`);
        expect(res.body).toContain("highlander"
           
        )
    })
} )