const db = require("../../data/dbConfig");
const { testing } = require("../../knexfile");
const Hobbit = require("./hobbits-model");

test("is the correct environment", () => {
  expect(process.env.DB_ENV).toBe("testing");
});
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
}); // migrate
beforeEach(async () => {
  await db.seed.run();
}); // truncate and seed fresh data
afterAll(async () => {
  await db.destroy();
}); // disconnect from the db

describe("hobbits model", () => {
  describe("insert", () => {
    test("it adds a hobbit to the table", async () => {
      await Hobbit.insert({ name: "smeagol" });
      const inserted = await db("hobbits").where("id", 5).first();
      expect(inserted).toMatchObject({ id: 5, name: "smeagol" });
    });
    test("Returns a new hobbit", async () => {
      const hobbit = { name: "bilbo" };
      const inserted = await Hobbit.insert(hobbit);
      expect(inserted).toMatchObject({ id: 5, name: "bilbo" });
    });
  });
  describe("remove", () => {
    test("deletes a hobbit", async () => {
      const deleted = await Hobbit.remove(3);
      const allHobbits = await db("hobbits");
      expect(allHobbits).toHaveLength(3);
    });

    it("matches the snapshot", async () => {
      await Hobbit.remove(3);
      const allHobbits = await db("hobbits");
      expect(allHobbits).toMatchSnapshot();
    });
  });
});
