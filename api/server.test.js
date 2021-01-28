const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

const Meme = require("./memes/memes-model");

const spoderman = { name: "spoderman" };
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

describe("server", () => {
  describe("[POST] /memes", () => {
    it("is functioning", async () => {
      let res = await request(server).get("/memes");
      expect(res.status).toBe(200);
    });

    it("returns added meme", async () => {
      let res = await request(server).post("/memes").send(spoderman);
      expect(res.body).toMatchObject(spoderman);
    });
  });

  describe("[DELETE] /meme/:id", () => {
    it("sends 200 status", async () => {
      let res = await request(server).delete("/memes/1");
      expect(res.status).toBe(200);
    });
    it("deletes a meme", async () => {
      const [id] = await db("memes").insert(spoderman);
      const returnedMeme = await db("memes").where({ id }).first();
      expect(returnedMeme.id).toEqual(1);

      await Meme.remove(id);
      const findRemovedId = await db("memes").where("id", 1).first();
      expect(findRemovedId).toBeUndefined();
    });
  });
});
