const db = require('../../data/dbConfig');
const ipHolder = require('./ipholder-model');

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

describe("ipholder tests", () => {
    it("[0] tests can pass", () => {
        expect(true).toBeTruthy();
    })
    it("[1] ipholder has a model object", () => {
        expect(ipHolder).toBeDefined();
    })
    it("[2] ipsource table contains data", async () => {
        const results = await ipHolder.find();
        expect(results.length).toBeGreaterThan(0);
    })
    it("[3] create inserts a record into the ipsource table", async () => {
        const start = await ipHolder.find();
        await ipHolder.create({ sourcename: "Just For Test, Inc." });
        const result = await ipHolder.find();

        expect(result.length).toBe(start.length + 1);
    })
    it("[4] delete removes a record from the ipsource table", async () =>{
        const start = await ipHolder.find();
        await ipHolder.remove(start.length -1);
        const result = await ipHolder.find();

        expect(result.length).toBe(start.length - 1);
    })
})
