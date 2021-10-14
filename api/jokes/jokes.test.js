const request = require("supertest");
const db = require("../../data/dbConfig");
const server = require("../../api/server");
const Joke = require("./jokes-model");

const joke1 = {
  joke_name: "steven's joke",
  main_joke: "why did the chicken cross the road?",
  joke_punchline: "because it was free range!",
};

const joke2 = {
  joke_name: "allison's joke",
  main_joke: "why did the chicken cross the road?",
  joke_punchline: "I don't know, I have a hard time make decisions!",
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("jokes").truncate();
});

afterAll(async () => {
  await db.destroy();
});

it("correct environment variable", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("Part 1: Jokes model functions", () => {
  describe("[a] can create a joke", () => {
    it("[a.i] adds a joke to the database", async () => {
      await Joke.createJoke(joke1);
      jokes = await db("jokes");
      expect(jokes).toHaveLength(1);

      await Joke.createJoke(joke2);
      jokes = await db("jokes");
      expect(jokes).toHaveLength(2);
    });
    it("[a.ii] inserted joke and punchline", async ()=>{
        const joke = await Joke.createJoke(joke1)
        expect(joke).toMatchObject(joke1)
    })
  });
  describe("[b] can delete a joke from the database", ()=>{
      it("[b.i] deletes the correct joke from the database", async ()=>{

          const [id] = await db("jokes").insert(joke2)
          let newJoke = await db('jokes').where("joke_id", id).first()
          expect(newJoke).toBeTruthy()

          await request(server).delete("/1")
          let hopefullyGone = await db('jokes').where("joke_id", '1').first()
          expect(hopefullyGone).toBeFalsy()
      })
  })
});
