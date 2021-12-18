const request = require("supertest")
const db = require("../../db-config")
const server = require("../server")

const jokesModel = require('./jokes-model')


const joke1 = {
    joke_question: "Why did the chicken cross the road?",
    joke_answer: "To get to the other side"
}

const joke2 = {
    joke_question: "What do you call a fake noodle?",
    joke_answer: "An impasta"
}

//this before all of the tests this clears the DB and then runs the migration of the table again
beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

// before each test delete all the data thats in side the jokes db
beforeEach(async () => {
    await db("jokes").truncate()
})

// after all tests destroy jokes table
afterAll(async () => {
    await db.destroy()
})

it("correct env var", () => {
    expect(process.env.NODE_ENV).toBe("testing")
})

describe("Jokes model functions", () => {
    describe("create joke", () => {
        it("adds joke to the db", async () => {
            let jokes
            await jokesModel.createJoke(joke1)
            jokes = await db("jokes")
            expect(jokes).toHaveLength(1);


            await jokesModel.createJoke(joke2)
            jokes = await db("jokes")
            expect(jokes).toHaveLength(2);
        })


        it("inserted joke and punchline", async () => {
            const joke = await jokesModel.createJoke(joke1)
            expect(joke).toMatchObject({ id: 1, ...joke1 })
        })

        it("deletes desired joke", async () => {
            const [id] = await db("jokes").insert(joke1)
            let joke = await db("jokes").where({ id }).first()
            expect(joke).toBeTruthy()

            await request(server).delete("/api/jokes/" + id)
            joke = await db("jokes").where({ id }).first()
            expect(joke).toBeFalsy()
        })

        it("responds with deleted joke", async () => {
            const [id] = await db("jokes").insert(joke1)
            let joke = await request(server).delete("/api/jokes/" + id)
            expect(joke.body).toMatchObject(joke1)
        })
    })
})

