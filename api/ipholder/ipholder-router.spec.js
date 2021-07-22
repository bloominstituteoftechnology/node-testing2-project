const db = require('../../data/dbConfig');
const server = require('../server');
const response = require('supertest');

beforeAll( async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach( async () => {
    await db("ipsource").truncate();
    await db.seed.run();
})

afterAll( async () => {
    await db.destroy()
})

describe("ipholder-router tests", () => {
    it("[0] tests can run", () => {
        expect(true).toBe(true);
    })
    it("[1] server exists", () => {
        expect(server).toBeDefined();
    })
    describe("create ipholder", () => {
        const input = { sourcename: "Just For Testing, Inc."}
        it("[2] create ip exists", async () => {
            const res = await response(server).post('/api/ipholder')
                .send(input);
            
            expect(res).toBeTruthy();
            expect(res.status).not.toBe(404);
        })
        it("[3] create ip actually adds a record to the database", async () => {
            const start = await response(server).get("/api/ipholder");
            await response(server).post("/api/ipholder")
                .send(input);
            const result = await response(server).get('/api/ipholder');

            expect(result.length).toBe(start.length + 1);
        })
        it("[4] create responds with created ipholder", async () => {
            const res = await response(server).post('/api/ipholder')
                .send(input);
            
            expect(res.body).toMatchObject(input);    
        })
    })
    describe("remove ipHolder", () => {
        it("[5] delete endpoint is defined", async () => {
            const res = await response(server).delete('/api/ipholder/4');
            
            expect(res).toBeTruthy();
            expect(res.status).not.toBe(404);
        })
        it("[6] delete endpoint removes record", async () => {
            const start = await response(server).get("/api/ipholder");
            await response(server).delete("/api/ipholder/4");
            const result = await response(server).get('/api/ipholder');

            expect(result.length).toBe(start.length - 1);
        })
    })
})
