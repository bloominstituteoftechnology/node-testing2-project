const Coasters = require("./model");
const db = require("../data/dbConfig");

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

describe("get", () => {

    test("resolves to all the coasters", async () => {
        const coasters = await Coasters.get()

        expect(coasters).toHaveLength(6)
        expect(coasters[0].coaster_name).toBe("Steel Vengeance")
        expect(coasters[3].coaster_name).toBe("Kingda Ka")
    })

    test("resolves to the correct coaster when given id", async () => {

        let [coaster] = await Coasters.get({ coaster_id: 1 })
        expect(coaster.coaster_name).toBe("Steel Vengeance");

        [coaster] = await Coasters.get({ coaster_id: 4 })
        expect(coaster.coaster_name).toBe("Kingda Ka");

        [coaster] = await Coasters.get({ coaster_id: 5 })
        expect(coaster.abbrv).toBe("I305");
    })
})