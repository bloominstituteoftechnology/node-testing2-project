const supertest = require("supertest")
const server = require("../api/server")
const db = require("../data/db-config")


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


describe("users integration tests", () => {
  it("gets all users", async () => {
    //call the endpoint, assert against the response
    const res = await supertest(server).get("/api/users")
    //console.log(res)
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.length).toBeGreaterThanOrEqual(1)
  })
  it("gets a single user by user_id", async () => {
    const name = "bob"
    const res = await supertest(server).get("/api/users/1")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.user_id).toBe(1)
    expect(res.body.username).toBe(name)
  })
  it("returns a 404 error message if user is missing", async () => {
    const res = await supertest(server).get("/api/users/50")
    expect(res.statusCode).toBe(404)
  })
  it("registers a new user", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "json statham", password: "12345" })
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.username).toBe("json statham")
    expect(res.body.user_id).toBeDefined()
  })
  it("deletes an existing user", async () => {
    const res = await supertest(server)
      .delete("/api/delete/1")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("The user has been removed")
  })
})