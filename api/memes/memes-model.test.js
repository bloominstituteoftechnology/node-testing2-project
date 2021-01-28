it("is the correct env", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

const Meme = require("./memes-model");
const db = require("../../data/dbConfig");

const spoderman = { name: "spodermn" };
const doge = { name: "doge" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("memes").truncate();
});
afterAll(async () => {
  await db.destroy();
});

describe("Memes model", () => {
  describe("insert function", () => {
    it("memes db initial length 0", async () => {
      let all = await db("memes");
      expect(all).toHaveLength(0);
    });
    it("adds memes to db", async () => {
      let all;
      await Meme.insert(spoderman);
      all = await db("memes");
      expect(all).toHaveLength(1);
    });
    it("returns the added meme", async () => {
      let returnedMeme = await Meme.insert(spoderman);
      expect(returnedMeme).toMatchObject(spoderman);
    });
  });
  describe("delete function", () => {
    it("exists", async () => {
      // const deleteFn = await Meme.delete(spoderman)
      expect(Meme.delete).not.toBeNull();
    });
    it("deletes a meme", async () => {
      const returnedSpoder = await Meme.insert(spoderman);
      expect(returnedSpoder.id).toEqual(1);
      Meme.remove(returnedSpoder.id);
      const check = await db("memes").where("id", returnedSpoder.id);
      expect(check).toHaveLength(0);
    });
  });
});
