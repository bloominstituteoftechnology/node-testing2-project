const db = require("../../data/dbConfig");
const Game = require("./games-model");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

test("runs in correct env", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("Game.getAll()", () => {
  let games
  beforeEach(async () => {
    games = await Game.getAll()
  })
  it("gets all games", async () => {
    expect(games).toHaveLength(5)
  })
})