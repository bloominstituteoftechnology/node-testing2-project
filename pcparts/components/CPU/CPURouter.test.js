const db = require("../../data/config");
const CPU = require("./CPUModel");

const CPURouter = require("./CPURouter");
const request = require("supertest");

beforeEach(async () => {
  await db("CPU").truncate();
})

describe("Endpoint GET /cpu", () => {
  it("GET all cpus in database return array", () => {
    return request(CPURouter)
      .get("/")
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(req.body).toBeInstanceOf(Array)
        expect(req.body).toBeGreaterThan(0)
      })
  })

  it("POST a new Resource return array with id", () => {
    return request(CPURouter)
    .post("/")
    .expect({
      Manufacter: "AMD",
      Model: "Ryzen 5 2600",
      Socket: "AM4",
      ClockSpeed: 3.8,
      Price: 165
    })
    .then(res => {
      expect(req.body).toBeInstanceOf(Array)
      expect(req.body).toHaveLength(1)
      expect(req.body[0]).toBeInstanceOf(Number)
    })
  })

  it("Delete a Resource", () => {
    return request(CPURouter)
    .post("/")
    .expect({
      Manufacter: "AMD",
      Model: "Ryzen 5 2600",
      Socket: "AM4",
      ClockSpeed: 3.8,
      Price: 165
    })
    .then(res => {
      expect(req.body).toBeInstanceOf(Array)
      expect(req.body).toHaveLength(1)
      expect(req.body[0]).toBeInstanceOf(Number)
    })
  })
})

