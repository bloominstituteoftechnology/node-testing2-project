const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")


beforeEach(async () => {
	await db.seed.run()
})

beforeAll(async () => {
	await db.migrate.rollback()
	await db.migrate.latest()
})

afterAll(async () => {
	await db.destroy()
})

describe("Jokes API integration tests", () => {
    it("verifies that a new joke can be added", async() => {
        let setup = "How many Boolean programmers does it take to screw in a lightbulb?"
        let punchline = "Yes"
        const res = await supertest(server).post("/").send({Setup: setup, Punchline: punchline})
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBeGreaterThanOrEqual(10)
    });
    it("verifies that a joke can be deleted", async() => {
        const res = await supertest(server).delete("/1")
        expect(res.statusCode).toBe(200)
        expect(res.body).toBe("Joke has been deleted")
    })
})