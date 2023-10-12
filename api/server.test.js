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
    test("[b] Testing enviroment", () => {
        expect(process.env.Node_ENV).toBe("testing");
    });
});