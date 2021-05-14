const supertest = require("supertest")
const server = require("../server")

describe("characters integration tests", () => {
	it("gets all characters", async () => {
		const res = await supertest(server).get("/characters")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body.length).toBeGreaterThanOrEqual(4)
		expect(res.body[0].name).toBe("Harry Potter")
	})

	it("gets character by ID", async () => {
		const res = await supertest(server).get("/characters/2")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body.id).toBe(2)
		expect(res.body.name).toBe("Hermione Granger")
	})

	it("returns a 404 for missing character", async () => {
		const res = await supertest(server).get("/characters/50")
		expect(res.statusCode).toBe(404)
	})

	it("creates a new character", async () => {
		const res = await supertest(server)
			.post("/characters")
			.send({ name: "Molly Weasley" })
		expect(res.statusCode).toBe(201)
		expect(res.type).toBe("application/json")
		expect(res.body.name).toBe("Molly Weasley")
		expect(res.body.id).toBeDefined()
	})

    it("deletes a character", async () => {
		const res = await supertest(server)
			.delete("/characters/1")
		expect(res.statusCode).toBe(200)
        expect(res.type).toBe("")
        expect(res.body).toStrictEqual({})
	})
})