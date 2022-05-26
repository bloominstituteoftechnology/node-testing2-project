const server = require("./server")
const request = require("supertest")
const db = require("../data/db-config")

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db("users").truncate()
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy();
});

describe("server tests", () => {
    test("server is up", async () => {
        let resp = await request(server).get("/")
        expect(resp.status).toBe(200)
        expect(resp.body).toEqual({ api: "up" })
    })

    test("users returns all users", async () => {
        let resp = await request(server).get("/users")

        expect(resp.status).toBe(200)
        expect(resp.body).toBeDefined()
    })

    test("users/:id to return user with id", async () => {
        let resp = await request(server).get("/users/3")

        expect(resp.status).toBe(200)
        expect(resp.body).toEqual({ id: 3, name: "fax" })
    })

    test("post users return new user", async () => {
        let resp = await request(server).post("/users").send({ name: "qax" })

        expect(resp.status).toBe(201)
        expect(resp.body).toEqual({ id: 5, name: "qax" })
    })

    test("DELETE /users/:id", async () => {
        const resp = await request(server).delete("/users/1")

        expect(resp.body).toEqual({ id: 1, name: "dax" })
    })

    test("GET /asc", async () => {
        const resp = await request(server).get("/asc")

        expect(resp.status).toBe(200)
    })

    test("GET /desc", async () => {
        const resp = await request(server).get("/desc")

        expect(resp.status).toBe(200)
    })

    test("GET /descIds", async () => {
        const resp = await request(server).get("/asc")

        expect(resp.status).toBe(200)
    })

    test("GET /onlyNames", async () => {
        const resp = await request(server).get("/onlyNames")
        expect(resp.status).toBe(200)
    })

    test("GET /onlyIds", async () => {
        const resp = await request(server).get("/onlyIds")
        expect(resp.status).toBe(200)
    })
})