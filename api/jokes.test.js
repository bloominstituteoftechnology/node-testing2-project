const request = require('supertest')//lets us do server calls
const db = require('../data/dbConfig')
const server = require('../server')// supertest needs access to our server
const Joke = require('./jokesModel')

const joke1 = {joke: "why did the chicken cross the road?", punchline: "Because it was free range"}
const joke2 = {joke: "why did the chicken cross the road?", punchline: "To avoid this lame and outdated joke"}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db("jokes").truncate()
})

afterAll(async () => {
    await db.destroy()
})

it("correct env var", () => {
    expect(process.env.DB_ENV).toBe("testing")
})

describe("jokes model functions", () => {
    describe("create joke", () => {
        it("adds joke to the db", async () => {
            let jokes
            await Joke.createjoke(joke1)
            jokes = await db("jokes")
            expect(jokes).toHaveLength(1)

            await Joke.createJoke(joke2)
            jokes = await db("jokes")
            expect(jokes).toHaveLength(2)
        })
        it("inserted a joke and a punchline", async () => {
            const joke = await joke.createJoke(joke1)//before each "it" it destroys the db so
            expect(joke).toMatchObject({joke_id: 1,...joke})
        })
    })
    describe("[DELETE] / - delete joke", () => {
        it("removes joke from db", async () => {
            const [joke_id] = await db("jokes").insert(joke1)
            let joke = await db("jokes").where({joke_id}).first()//same as ({"joke_id", joke_id})
            expect(joke).toBeTruthy()
            await request(server).delete("/jokes/"+ joke_id)// supertest library
            joke = await db("jokes").where({joke_id}).first()
            expect(joke).toBeFalsy()
        })
        it("respond with the deleted joke", async () => {
            await db("jokes").insert(joke1)
            let joke = await request(server).delete("/jokes/1")
            expect(joke.body).toMatchObject(joke1)
        })
    })
})