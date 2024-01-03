const request = require("supertest");
const db = require("../data/db-config");
const server = require("../server");
const Dirtbike = require("./dirtbikeModel");

const dirtbike1 = { brand: "ktm", size: 125, price: 6000 };
const dirtbike2 = { brand: "husky", size: 80, price: 8000 };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

// beforeAll(async () => {
//   await db.seed.run();
// });

// beforeAll(async () => {
//   await db("dirtbikes").truncate();
// });

// afterAll(async () => {
//   await db.destroy();
// });

it("correct enviorment variable", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("dirtbike model function", () => {
  test("adds dirtbike to the db", async () => {
    let dirtbikes;
    await Dirtbike.createDirtbike(dirtbike1);
    dirtbikes = await db("dirtbikes");
    expect(dirtbikes).toHaveLength(1);

    await Dirtbike.createDirtbike(dirtbike1);
    dirtbikes = await db("dirtbikes");
    expect(dirtbikes).toHaveLength(2);
  });
  test("inerted dirtbike and information", async () => {
    const dirtbike = await Dirtbike.createDirtbike(dirtbike1);
    expect(dirtbike).toMatchObject({ dirtbike_id: 1, ...dirtbike });
  });
});

describe("[DELETE] / delete joke", () => {
  test("remove joke from database", async () => {
    const [dirtbike_id] = await db("dirtbikes").insert(dirtbike1);
    let dirtbike = await db("dirtbikes").where({ dirtbike_id }).first();
    expect(dirtbike).toBeTruthy();
    await request(server).delete("/dirtbikes/" + dirtbike_id);
    dirtbike = await db("dirtbikes").where({ dirtbike_id }).first();
  });
  test("respond with the deleted joke", async () => {
    await db("dirtbikes").insert(dirtbike1);
    let dirtbike = await request(server).delete("/dirtbikes/1");
    expect(dirtbike.body).toMatchObject(dirtbike1);
  });
});
