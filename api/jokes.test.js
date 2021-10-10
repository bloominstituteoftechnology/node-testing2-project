const request = require("supertest")
const db = require("../data/dbconfig")
const server = require("../server")
const Joke = require("./jokesModel")

const joke1 = {joke: "Why did the chicken cross the road?", punchline: "because it was free range. I am sorry"}
const joke2 = {joke: "Why did the chicken.. -chad cross the road?", punchline: "it was sore from creating it's own path"}


    //db calls -> need async/await
    beforeAll(async ()=> {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=> {
    await db("jokes").truncate()
})

afterAll(async ()=> {
    await db.destroy()
})

it("correct env var", ()=> {
    expect(process.env.DB_ENV).toBe("testing")
})

describe("Jokes model functions", ()=> {
    describe("create joke", ()=> {
        it("adds jokes to the db", async ()=> {
            let jokes 
            await Joke.createJoke(joke1)
            jokes = await db('jokes')
            expect(jokes).toHaveLength(1)

            await Joke.createJoke(joke2)
            jokes = await db('jokes')
            expect(jokes).toHaveLength(2)
        })
    })
})