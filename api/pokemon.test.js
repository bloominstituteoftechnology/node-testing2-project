const db = require("../data/db-config");
const request = require("supertest");
const server = require("../server");
const Pokemon = require("./pokemon-model");

const pikachu = { pokemon_name: "Pikachu", max_hp: 35 };
const arceus = { pokemon_name: "Arceus", max_hp: 999 };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("pokemon").truncate();
});

afterAll(async () => {
  await db.destroy();
});

it("[0] jest is working.", () => {
  expect(process.env.DB).toBe("testing");
});

describe("[1]. Model tests", () => {
  describe("Create Pokemon", () => {
    it("Adds Pokemon to database", async () => {
      await Pokemon.addmon(pikachu);
      const pokemon = await db("pokemon").first();
      expect(pokemon).toEqual({ ...pikachu, pokemon_id: 1 });
    });
  });
  describe("Delete Pokemon", () => {
    it("Removed Pokemon from Database", async () => {
      const [pokemon_id] = await db("pokemon").insert(pikachu);
      let pokemon = await db("pokemon").first();
      expect(pokemon).toBeTruthy();
      await Pokemon.delmon(pokemon_id);
      pokemon = await db("pokemon").first();
      expect(pokemon).toBeUndefined();
    });
  });
});

describe("[2]. API tests", () => {
  describe("Create Pokemon", () => {
    it("[POST] /api/pokemon", async () => {
      const [pokemon_id] = await request(server)
        .post("/api/pokemon")
        .send(pikachu)
        .expect(201)
        .then((response) => response.body);
      const pokemon = await db("pokemon").where({pokemon_id}).first();
      expect(pokemon).toEqual({ ...pikachu, pokemon_id });
    });
  });
  describe("Delete Pokemon", () => {
    it("[DELETE] /api/pokemon/:id", async () => {
      const [pokemon_id] = await request(server)
        .post("/api/pokemon")
        .send(pikachu)
        .expect(201)
        .then((response) => response.body);
      await request(server).delete(`/api/pokemon/${pokemon_id}`)
      const pokemon = await db("pokemon").where({pokemon_id}).first();
      expect(pokemon).toBeUndefined();
    });
  });
});
