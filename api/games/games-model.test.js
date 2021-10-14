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

test("[1]runs in correct env", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("Game.getAll()", () => {
  let games;
  beforeEach(async () => {
    games = await Game.getAll();
  });
  it("[2]gets all games", async () => {
    expect(games).toHaveLength(4);
  });
  it("[3]gets games in correct shape", async () => {
    expect(games).toMatchObject([
      {
        game_id: 1,
        game_name: "betrayal at house on the hill",
        max_players: 6,
      },
      { 
        game_id: 2, 
        game_name: "chess", 
        max_players: 2 
      },
      { 
        game_id: 3, 
        game_name: "small world", max_players: 5 
      },
      { 
        game_id: 4, 
        game_name: "bang", 
        max_players: 8 
      },
    ]);
  });
});

describe("Game.getById()", () => {
  let bang;
  beforeEach(async () => {
    bang = await Game.getById(4);
  });
  it("[4]gets correct id", async () => {
    expect(bang.game_id).toBe(4)
  })
  it("[5]gets correct name", async () => {
    expect(bang).toMatchObject({ game_name: "bang"})
  })
});

describe("Game.add()", () => {
  let input = { game_name: "uno" };
  it("[6]adds new game", async () => {
    await Game.add(input)
    const games = await db("games")
    expect(games).toHaveLength(5)
  })
})
