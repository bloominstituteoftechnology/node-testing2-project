const request = require("supertest");
const server = require("../server.js");
const db = require("../data/db-config");
const supertest = require("supertest")

const yoda = { name: "Yoda" };
const obiwan = { name: "obiwan" };
beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db("jedi").truncate();
});

afterAll(async () => {
    await db.destroy();
});

describe("server", () => {
    describe("[POST] /jedi", () => {
        it("responds with  newly created jedi", async () => {
            let res = await request(server).post("/jedi").send(yoda);
            expect(res.statusCode).toBe(201)
            expect(res.body).toMatchObject({ id: 1, ...yoda });

            res = await request(server).post("/jedi").send(obiwan);
            expect(res.body).toMatchObject({ id: 2, ...obiwan });
        });
    });
    describe("[DELETE] /jedi", () => {
        it("deletes jedi", async () => {
            let res = await request(server).post("/jedi").send(yoda);
            expect(res.body).toMatchObject({ id: 1, ...yoda });
            
            const newRes = await supertest(server).delete("/chars/1")
            expect(newRes.statusCode).toBe(201)


        });
    });
});
