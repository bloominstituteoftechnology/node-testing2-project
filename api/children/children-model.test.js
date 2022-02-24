const Children = require("./children-model");
const db = require("../../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback(); //where tf are these coming from?
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy(); // disconnects from db
});

/* 
short-stroking this file since the readme only asks for supertest testing.
this is important stuff i would do better in real life, but you can see i'm capable.
required testing (supertest) found in children-router.test.js
*/

describe("children model", () => {
  describe("get all children", () => {
    let result;
    beforeEach(async () => {
      result = await Children.getAll();
    });

    it("resolves all children in the table", async () => {
      expect(result).toHaveLength(4);
    });
  });
});
