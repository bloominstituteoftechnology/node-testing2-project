const db = require("../data/db-config.js");
const request = require("supertest");
const server = require("./server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("[GET] /teams", () => {
  test("[1] responds with 200 OK", async () => {
    const res = await request(server).get("/teams");
    expect(res.status).toBe(200);
  });
  test("[2] returns all the teams in the db", async () => {
    const res = await request(server).get("/teams");
    expect(res.body).toHaveLength(16);
  });
  test("[3] if there are no teams it returns an empty array", async () => {
    await db("sec_teams").truncate();
    const res = await request(server).get("/teams");
    expect(res.body).toHaveLength(0);
  });
});

describe("[GET] /teams/:id", () => {
  test.todo("[4] responds with 200 OK");
  test.todo("[5] returns a team by id from the db");
  test.todo("[6] if the team does not exist it returns a 404");
});

describe("[POST] /teams", () => {
  test.todo("[7] responds with 201 CREATED");
  test.todo("[8] returns the newly created team");
  test.todo("[9] adds a team to the database");
  test.todo("[10] ensures that the body is required");
});
