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
  test("[4] responds with 200 OK", async () => {
    const id = 1;
    const res = await request(server).get(`/teams/${id}`);
    expect(res.status).toBe(200);
  });
  test("[5] returns a team by id from the db", async () => {
    const id = 1;
    const res = await request(server).get(`/teams/${id}`);
    expect(res.body).toMatchObject({
      id: 1,
      school_name: "Alabama",
      mascot: "Crimson Tide",
    });
  });
  test("[6] if the team does not exist it returns a 404", async () => {
    const id = 999;
    const res = await request(server).get(`/teams/${id}`);
    expect(res.status).toBe(404);
  });
});

describe("[POST] /teams", () => {
  const team = { school_name: "Wisconsin", mascot: "Badgers" };
  test("[7] responds with 201 CREATED", async () => {
    const res = await request(server).post("/teams").send(team);
    expect(res.status).toBe(201);
  });
  test("[8] returns the newly created team", async () => {
    const res = await request(server).post("/teams").send(team);
    expect(res.body).toMatchObject(team);
  });
  test("[9] adds a team to the database", async () => {
    await request(server).post("/teams").send(team);
    const teams = await db("sec_teams");
    expect(teams).toHaveLength(17);
  });
  test("[10] ensures that the body is required", async () => {
    const res = await request(server).post("/teams").send({});
    expect(res.status).toBe(500);
  });
});
