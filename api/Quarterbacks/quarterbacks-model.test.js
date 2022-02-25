const db = require("../../data/db-config");
const QuarterBackPosition = require("./quarterbacks-model");

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

describe("Quarterbacks db access function", () => {
  it("getAll function returns all quarterbacks", async () => {
    const allQuarterbacks = await QuarterBackPosition.getAll();
    expect(allQuarterbacks.length).toBe(3);
  });
  it("returns the correct shape", async () => {
    const allQuarterbacks = await QuarterBackPosition.getAll();
    expect(allQuarterbacks[0]).toMatchObject({ quarterback_name: "Tom Brady" });
  });
  it("create a new quarterback to list", async () => {
    const newQuarterback = await QuarterBackPosition.add({
      quarterback_name: "Steve Young",
    });
    expect(newQuarterback[0]).toMatchObject({
      quarterback_id: 4,
      quarterback_name: "Steve Young",
    });
  });
});
