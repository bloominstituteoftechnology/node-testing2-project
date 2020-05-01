const supertest = require('supertest')
const server = require('./index')
const db = require('./data/config')

beforeEach(async () => {
  await db.seed.run()
})

test("welcome route", async () => {
  const res = await supertest(server).get("/")
  expect(res.statusCode).toBe(200)
  expect(res.type).toBe("application/json")
  expect(res.body.message).toBe("Welcome to our API")
  expect(res.body.message).toHaveLength(18)
  expect(res.body.message).toMatch(/welcome/i)
})

test("create user route", async () => {
  const res = await supertest(server)
    .post("/users")
    .send({ name: "gaffer"})
   expect(res.statusCode).toBe(201)
   expect(res.type).toBe("application/json")
   expect(res.body.name).toBe("gaffer")
})