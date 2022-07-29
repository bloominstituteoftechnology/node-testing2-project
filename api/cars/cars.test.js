const request = require('supertest')
const db = require("../../data/db-config")
const server = require('../server')
const Car = require("./cars-model")

const car1 = { make: "KIA", model: "Forte", transmission: "Automatic" }
const car2 = { make: "Chevrolet", model: "Silverado", transmission: "Manual" }

beforeAll(async () => {
   await db.migrate.rollback()
   await db.migrate.latest()
})

beforeEach(async () => {
    await db("cars").truncate()
})

afterAll(async () => {
    await db.destroy()
})

it("correct env var", () => {
    expect(process.env.DB_ENV).toBe("testing")
})

describe("Cars model functions", () => {
    describe("create car", () => {
        it("adds a car to the db", async () => {
            let cars
            await Car.createCar(car1)
            cars = await db("cars")
            expect(cars).toHaveLength(1)

            await Car.createCar(car2)
            cars = await db("cars")
            expect(cars).toHaveLength(2)
        })

        it("inserted make and model", async () => {
            const car = await Car.createCar(car1)
            expect(car).toMatchObject({ id: 1, ...car })
        })
    })

    describe("[DELETE] / - delete car", () => {
        it("removes a car from the db", async () => {
            const [id] = await db("cars").insert(car1)
            let car = await db("cars").where({ id }).first()
            expect(car).toBeTruthy()
            await request(server).delete("/cars/" + id)
            car = await db("cars").where({ id }).first()
            expect(car).toBeFalsy()
        })
        it("responds with the deleted car", async () => {
            await db("cars").insert(car1)
            let car = await request(server).delete("/cars/1")
            expect(car.body).toMatchObject(car1)
        })
    })
})