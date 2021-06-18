const supertest = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")


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
  it("gets all products", async () => {
    //call the endpoint, assert against the response
    const res = await supertest(server).get("/api/products/")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.length).toBeGreaterThanOrEqual(3)
  })
  it("gets products by id", async () => {
    const name = "cards"
    const res = await supertest(server).get("/api/products/1")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    console.log(res.body)
    expect(await res.body[0].id).toBe(1)
    expect(res.body[0].product_name).toBe(name)
  })
  it("post a new product", async () => {
    const res = await supertest(server)
      .post("/api/products/")
      .send({ product_name:"computer",product_description:"a brand new pc",price:"100" })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
  })
  it("deletes an existing user", async () => {
    const res = await supertest(server)
      .delete("/api/products/1")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body[0]).toBeUndefined()
  })
  it("returns a 404 error message if user is missing", async () => {
    const res = await supertest(server)
    .post("/api/products")
    expect(res.statusCode).toBe(400)
  })
  it("registers a new user", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "Daniel Walker", password: "12345" })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.username).toBe("Daniel Walker")
    expect(res.body.id).toBeDefined()
  })

})