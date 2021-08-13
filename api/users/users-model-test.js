const utils = require("./index");
const db = require("../data/dbConfig");
const User = require("./users/users-model");

describe("User model", () => {
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });
  beforeEach(async () => {
    await db("users").truncate();
  });
  afterAll(async () => {
    await db.destroy();
  });

  // * * *
  describe("[Exercise 1]", () => {
    let users;
    beforeEach(() => {
      users = new utils.User(); // each test must start with fresh users
    });

    test("[1] getAll users", () => {
      test("returns an array when there are no users", async () => {
        users = await User.getAll();
      });
      expect(users).toEqual([]);
    });
  });

  test("returns an array of users when they exist", async () => {
    await db.seed.run();
    const users = await User.getAll();
    expect(users.length).toBe(4);
    users.beforeEach((user) => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
    });
  });

  describe("insert()", () => {
    test("creates a new user", async () => {
      const user = await User.insert({ name: "stan" });
      expect(user).toMatchObject({ name: "Stan" });
    });
  });

  describe("getById()", () => {
    test("returns the user if it exists", async () => {
      const { id } = await User.insert({ name: "Stannn" });
      const user = await User.getById(id);
      expect(user).toMatchObject({ name: "Stan" });
    });
    test("returns undefined when the user doesn't exist", async () => {
      const result = await User.getById("12345");
      expect(result).toBeUndefined();
    });
  });

  describe("update()", () => {
    test("updates an existing user", async () => {
      const { id } = await User.insert({ name: "Stan" });
      await User.update(id, { name: "Stan 1" });
      const user = await User.getById(id);
      expect(user).toMatchObject({ name: "Stan 1" });
    });
  });

  describe("remove()", () => {
    test("removes the user", async () => {
      const { id } = await User.insert({ name: "Stan" });
      await User.remove(id);
      expect(await User.getById(id)).toBeUndefined();
    });
  });
});
