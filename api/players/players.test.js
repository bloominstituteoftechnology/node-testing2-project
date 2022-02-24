const model = require("./players-model");
const db = require("../../data/dbConfig");
const request = require("supertest");
const server = require("./players-router");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("players").truncate();
});

test("verify we are using the correct environment", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("test the models", () => {
  test("test the the data is empty", async () => {
    let result = await db("players");
    expect(result).toHaveLength(0);
  });
  test("You are able to add players", async () => {
    let result = await model.addPlayer({ name: "lebron", age: 37 });
    expect(result).toEqual({ name: "lebron", age: 37, id: 1 });
    let players = await db("players");
    expect(players).toHaveLength(1);
  });

  test("able to get player by id", async () => {
    let { id1 } = await model.addPlayer({ name: "Stephen curry", age: 33 });
    let { id2 } = await model.addPlayer({ name: "kevin", age: 32 });
    let { id3 } = await model.addPlayer({ name: "lebron", age: 37 });
    let result = await model.getById(1);
    expect(result).toEqual({ id: 1, name: "Stephen curry", age: 33 });
    result = await model.getById(2);
    expect(result).toEqual({ id: 2, name: "kevin", age: 32 });
    result = await model.getById(3);
    expect(result).toEqual({ id: 3, name: "lebron", age: 37 });
  });

  test("able to update a player", async () => {
    await model.addPlayer({ name: "lebron", age: 37 });

    let result = await model.update(1, { age: 35 });
    expect(result).toHaveProperty("age", 35);
  });

  test("able to delete", async () => {
    await model.addPlayer({ name: "lebron", age: 37 });
    await model.addPlayer({ name: "curry", age: 35 });
    await model.addPlayer({ name: "kevin", age: 34 });
    let result = await model.get();
    expect(result).toHaveLength(3);
    result = await model.remove(2);
    expect(result).toEqual({ id: 2, name: "curry", age: 35 });
    result = await model.get();
    expect(result).toHaveLength(2);
  });
});
