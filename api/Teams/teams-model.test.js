const db = require("../../data/db-config");
const Teams = require("./teams-model");

test("it is the correct environment for the tests", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("testing db functions", () => {
  it("getAll function returns all quarterbacks", async () => {
    const allTeams = await Teams.getAll();
    expect(allTeams.length).toBe(3);
  });
});
