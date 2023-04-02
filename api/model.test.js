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

});

describe("getBy", () => {

    test("resolves to the correct coaster when given id", async () => {

        let coaster = await Coasters.getBy({ coaster_id: 1 })
        expect(coaster.coaster_name).toBe("Steel Vengeance");

        coaster = await Coasters.getBy({ coaster_id: 4 })
        expect(coaster.coaster_name).toBe("Kingda Ka");

        coaster = await Coasters.getBy({ coaster_id: 5 })
        expect(coaster.abbrv).toBe("I305");
    })

    test("resolves to the correct coaster for a given abbreviation", async () => {

        let coaster = await Coasters.getBy({ abbrv: "MF"})
        expect(coaster.coaster_name).toBe("Millennium Force");

        coaster = await Coasters.getBy({ abbrv: "KK"})
        expect(coaster.coaster_name).toBe("Kingda Ka");

        coaster = await Coasters.getBy({ abbrv: "SV"})
        expect(coaster.coaster_name).toBe("Steel Vengeance");
        
    })
})

describe("add", () => {

    const raptor = {
        coaster_name: "Raptor",
        height: 137,
        speed: 57
    }

    const outlawRun = {
        coaster_name: "Outlaw Run",
        height: 107,
        speed: 68,
        abbrv: "OR"
    }

    const smiler = {
        coaster_name: "Smiler",
        height: 98.4,
        speed: 52.8
    }


    test("resolves to added coaster", async () => {

        let res = await Coasters.add(raptor);

        expect(res).toMatchObject(raptor);

        res = await Coasters.add(outlawRun);

        expect(res).toMatchObject(outlawRun);

        res = await Coasters.add(smiler);

        expect(res).toMatchObject(smiler);
    })

    test("coasters db size increases with each add", async () => {

        await Coasters.add(raptor);
        expect(await db("coasters")).toHaveLength(7);

        await Coasters.add(outlawRun);
        expect(await db("coasters")).toHaveLength(8);

        await Coasters.add(smiler);
        expect(await db("coasters")).toHaveLength(9);
    })

    test("added coasters are in db", async () => {
        let newCoaster = await Coasters.add(raptor);
        let res = await db("coasters").where({coaster_id: newCoaster.coaster_id}).first();
        expect(res).toMatchObject(raptor);

        newCoaster = await Coasters.add(outlawRun);
        res = await db("coasters").where({coaster_id: newCoaster.coaster_id}).first();
        expect(res).toMatchObject(outlawRun);
        
        newCoaster = await Coasters.add(smiler);
        res = await db("coasters").where({coaster_id: newCoaster.coaster_id}).first();
        expect(res).toMatchObject(smiler);
        
    })
})