
const Movies = require("./movies-model.js");
const db = require("../../data/db-config");

test("NODE_ENV is correct", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

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
test("MOVIES test", async () => {
  // expect(true).toBe(true)A
  const movies = await Movies.getAll();
  expect(movies).toHaveLength(4);
});
describe("MOVIES model", () => {
  let movies;
  beforeEach(async () => {
    movies = await Movies.getAll();
  });
  test("returns all movies in table", () => {
    expect(movies).toHaveLength(4);
  });
  test('returned movies have id and name', () => {
    expect(movies[0]).toMatchObject({  name: 'Coco' })
  })
});

describe('Movies.insert(hobbit)', () => {
    let starwar = {id: 5, name: 'Star War' }
    let result
    beforeEach(async () => {
      result = await Movies.insert(starwar)
    })

    test('db updates with the new hobbit', async () => {
      const theNewThing = await db('movies')
        .where('id', 5)
        .first()
      expect(theNewThing).toMatchObject({ id: 5, name: 'Star War' })
    })
    test('resolves the newly created hobbit', async () => {
      expect(result).toMatchObject({id: 5, name: 'Star War' })
    })
  })