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

describe("[DELETE] / delete dirtbike", () => {
  test("remove dirtbike from database", async () => {
    const [dirtbike_id] = await db("dirtbikes").insert(dirtbike1);
    let dirtbike = await db("dirtbikes").where({ dirtbike_id }).first();
    expect(dirtbike).toBeTruthy();
    await request(server).delete("/dirtbikes/" + dirtbike_id);
    dirtbike = await db("dirtbikes").where({ dirtbike_id }).first();
    expect(dirtbike).toBeFalsy();
  });
  test("verify dirtbike was deleted", async () => {
    await db("dirtbikes").insert(dirtbike1);
    let response = await request(server).delete("/dirtbikes/1");
    expect(response.status).toBe(204);
    const dirtbike = await db("dirtbikes").where("dirtbike_id", 1).first();
    expect(dirtbike).toBeUndefined();
  });
});

describe("[GET] make sure its returning data", () => {
  test("return dirtbikes that are in database", async () => {
    await db("dirtbikes").insert(dirtbike1);
    const response = await request(server).get("/dirtbikes");
    expect(response.status).toBe(200);
  });
});

describe("[GET] / get dirtbike by ID", () => {
  test("get dirtbike by ID", async () => {
    const [dirtbike_id] = await db("dirtbikes").insert(dirtbike1);
    const response = await request(server).get(`/dirtbikes/${dirtbike_id}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(dirtbike1);
  });
  test("get dirtbike by non-existent ID", async () => {
    const response = await request(server).get("/dirtbikes/999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Dirtbike not found" });
  });
});

describe("[PUT] / update dirtbike", () => {
  test("update dirtbike in database", async () => {
    const [dirtbike_id] = await db("dirtbikes").insert(dirtbike1);
    const updates = { brand: "updatedBrand", size: 150, price: 7000 };
    const response = await request(server)
      .put(`/dirtbikes/${dirtbike_id}`)
      .send(updates);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updates);
    const updatedDirtbike = await db("dirtbikes")
      .where("dirtbike_id", dirtbike_id)
      .first();
    expect(updatedDirtbike).toMatchObject(updates);
  });
  test("respond with the updated dirtbike", async () => {
    const [dirtbike_id] = await db("dirtbikes").insert(dirtbike1);
    const updates = { brand: "updatedBrand", size: 150, price: 7000 };
    const response = await request(server)
      .put(`/dirtbikes/${dirtbike_id}`)
      .send(updates);
    expect(response.body).toMatchObject(updates);
  });
  test("respond with 404 for non-existent dirtbike", async () => {
    const nonExistentId = 999;
    const updates = { brand: "updatedBrand", size: 150, price: 7000 };
    const response = await request(server)
      .put(`/dirtbikes/${nonExistentId}`)
      .send(updates);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Dirtbike not found" });
  });
});
