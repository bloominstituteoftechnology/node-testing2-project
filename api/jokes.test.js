const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../server.js');
const Joke = require('./jokesModel.js')


const joke1 = {
    joke: "What do you call a bear with no teeth?",
    punchline: "A gummy bear!",
}
const joke2 = {
    joke: "Why did the chicken cross the road?",
    punchline: "To get to the other side!",
}

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('jokes').truncate();
});

afterAll(async () => {
    await db.destroy();
});

it ('correct env var', () => {
    expect(process.env.DB_ENV).toBe('testing');
})

describe('Jokes model functions', () => {
    describe('create joke', () => {
        it('adds joke to database', async () => {
            let jokes
            await Joke.createJoke(joke1)
            jokes = await db("jokes")
            expect(jokes).toHaveLength(1)
            await Joke.createJoke(joke2)
            jokes = await db("jokes")
            expect(jokes).toHaveLength(2)
        })
        it('inserts joke and punchline', async () => {
            const joke = await Joke.createJoke(joke1)
            expect(joke).toMatchObject({ joke_id: 1, ...joke})
        })
    })
    describe('delete joke', () => {
        it('deletes joke from database', async () => {
            const [joke_id] = await db("jokes").insert(joke1)
            let joke = await db("jokes").where({ joke_id }).first()
            expect(joke).toBeTruthy()
            await request(server).delete(`/jokes/${joke_id}`)
            joke = await db("jokes").where({ joke_id }).first()
            expect(joke).toBeFalsy()
        })
        it("responds with the deleted joke", async () => {
            await db("jokes").insert(joke1)
            let joke = await request(server).delete(`/jokes/1`)
            expect(joke.body).toMatchObject(joke1)
        })
    })
    describe('update joke', () => {
        it('updates joke in database', async () => {
            const [joke_id] = await db("jokes").insert(joke1)
            let joke = await db("jokes").where({ joke_id }).first()
            expect(joke).toMatchObject(joke1)
            await request(server).patch(`/jokes/${joke_id}`).send({
                joke: "What do you call a bear with no teeth?",
                punchline: "A gummy bear!",
            })
            joke = await db("jokes").where({ joke_id }).first()
            expect(joke).toMatchObject({ joke_id, ...joke1 })
        })
        it("responds with the updated joke", async () => {
            await db("jokes").insert(joke1)
            let joke = await request(server).patch(`/jokes/1`).send({
                joke: "What do you call a bear with no teeth?",
                punchline: "A gummy bear!",
            })
            expect(joke.body).toMatchObject(joke1)
        })
    })
    describe('read jokes', () => {
        it('reads jokes from database', async () => {
            await db("jokes").insert(joke1)
            await db("jokes").insert(joke2)
            let jokes = await request(server).get("/jokes")
            expect(jokes.body).toHaveLength(2)
        })
    })
    describe('read joke by id', () => {
        it('reads joke from database', async () => {
            await db("jokes").insert(joke1)
            await db("jokes").insert(joke2)
            let joke = await request(server).get("/jokes/1")
            expect(joke.body).toMatchObject(joke1)
        })
    })
    describe('is empty', () => {
        it('checks db starts empty', async () => {
            let jokes = await request(server).get("/jokes")
            expect(jokes.body).toHaveLength(0)
        })
    })
})
