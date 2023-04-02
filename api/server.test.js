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

    test("responds with correct number of coasters", async () => {

    })

    test("responds with all the coasters", async () => {
        const res = await request(server).get("/api/coasters");

        const coasters = res.body;

        expect(coasters).toHaveLength(6);
        expect(coasters[0].coaster_name).toBe("Steel Vengeance")
        expect(coasters[1].coaster_name).toBe("Millennium Force")
        expect(coasters[3].coaster_name).toBe("Kingda Ka")
        expect(coasters[4].abbrv).toBe("I305")
    })
})

describe("[GET] /api/coasters/:id", () => {
    
    test("responds with 200 OK", async () => {
        const res = await request(server).get("/api/coasters/1");
        expect(res.status).toBe(200);
    })

    test("responds with coasters matching given id", async () => {
        let res = await request(server).get("/api/coasters/1");
        expect(res.body.coaster_name).toBe("Steel Vengeance");

        res = await request(server).get("/api/coasters/2");
        expect(res.body.coaster_name).toBe("Millennium Force");

        res = await request(server).get("/api/coasters/6");
        expect(res.body.abbrv).toBe("SEFK");
    })

    test("responds with coasters matching given abbrv", async () => {
        let res = await request(server).get("/api/coasters/SV");
        expect(res.body.coaster_name).toBe("Steel Vengeance");

        res = await request(server).get("/api/coasters/KK");
        expect(res.body.coaster_name).toBe("Kingda Ka");

        res = await request(server).get("/api/coasters/I305");
        expect(res.body.coaster_name).toBe("Intimidator 305");
    })

    test("abbrv is case insensitive", async () => {

        let res = await request(server).get("/api/coasters/sV");
        expect(res.body.coaster_name).toBe("Steel Vengeance");

        res = await request(server).get("/api/coasters/mf");
        expect(res.body.coaster_name).toBe("Millennium Force");

        res = await request(server).get("/api/coasters/SefK");
        expect(res.body.coaster_name).toBe("Superman: Escape from Krypton");

    })
})

describe("[POST] /api/coasters/", () => {

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

    test("responds with 201 created", async () => {
        const res = await request(server).post("/api/coasters").send(raptor);
        expect(res.status).toBe(201);
    })

    test("responds with new coaster", async () => {
        let res = await request(server).post("/api/coasters").send(raptor);
        expect(res.body).toMatchObject(raptor);

        res = await request(server).post("/api/coasters").send(outlawRun);
        expect(res.body).toMatchObject(outlawRun);

        res = await request(server).post("/api/coasters").send(smiler);
        expect(res.body).toMatchObject(smiler);
    })

    test("coasters db size increases with each add", async () => {
        await request(server).post("/api/coasters").send(raptor);
        expect(await db("coasters")).toHaveLength(7);

        await request(server).post("/api/coasters").send(outlawRun);
        expect(await db("coasters")).toHaveLength(8);

        await request(server).post("/api/coasters").send(smiler);
        expect(await db("coasters")).toHaveLength(9);
    })

    test("added coasters are in the db", async () => {
        let res = await request(server).post("/api/coasters").send(raptor);
        let newCoaster = res.body;

        expect(
            await db("coasters").where({coaster_id: newCoaster.coaster_id}).first()
        ).toMatchObject(raptor);
        
        res = await request(server).post("/api/coasters").send(outlawRun);
        newCoaster = res.body;

        expect(
            await db("coasters").where({coaster_id: newCoaster.coaster_id}).first()
        ).toMatchObject(outlawRun);
        
        res = await request(server).post("/api/coasters").send(smiler);
        newCoaster = res.body;

        expect(
            await db("coasters").where({coaster_id: newCoaster.coaster_id}).first()
        ).toMatchObject(smiler);
    })
})

describe("[DELETE] /api/coasters/:coaster_id", () => {
    test("responds with 200 OK", async () => {
        const res = await request(server).delete("/api/coasters/1");
        expect(res.status).toBe(200);
    })

    test("db decreases on each deletion", async () => {
        await request(server).delete("/api/coasters/1");
        expect(await db("coasters")).toHaveLength(5);

        await request(server).delete("/api/coasters/2");
        expect(await db("coasters")).toHaveLength(4);

        await request(server).delete("/api/coasters/6");
        expect(await db("coasters")).toHaveLength(3);
    })

    test("responds with the deleted coaster", async () => {
        let res = await request(server).delete("/api/coasters/1");
        expect(res.body.coaster_name).toBe("Steel Vengeance");

        res = await request(server).delete("/api/coasters/2");
        expect(res.body.coaster_name).toBe("Millennium Force");

        res = await request(server).delete("/api/coasters/5");
        expect(res.body.coaster_name).toBe("Intimidator 305");
        
        
    })
})