require("dotenv").config();

const request = require("supertest");
const server = require("../server/server.js");
const db = require("../db/connections.js");

const seed = {
  name: "aleph",
  version: "0.4.1",
  author: "alex gohorel",
  license: "GPL v3.0"
};

const payload = {
  name: "bend",
  version: "0.0.1",
  author: "alex gohorel",
  license: "GPL v3.0"
};

beforeEach(async () => {
  await db("packages").truncate();
  await db("packages").insert(seed);
});

describe("packages router - POST", () => {
  it("should return 201 on POST /api/packages", async () => {
    const res = await request(server)
      .post("/api/packages")
      .send(payload);

    expect(res.status).toBe(201);
  });

  it("should return the newly created resource in json format", async () => {
    const res = await request(server)
      .post("/api/packages")
      .send(payload);

    expect(res.body).toEqual(expect.objectContaining(payload));
  });
});

describe("packages router - GET", () => {
  it("should return 200 OK on GET /api/packages", async () => {
    const res = await request(server).get("/api/packages");
    expect(res.status).toBe(200);
  });

  it("should return an array of objects", async () => {
    const res = await request(server).get("/api/packages");
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 1 })])
    );
  });
});

describe("packages router - DELETE", () => {
  it("should return 200 OK on DELETE /api/packages", async () => {
    const res = await request(server).delete("/api/packages/1");
    expect(res.status).toBe(200);
  });

  it("should return a success message on deletion", async () => {
    const res = await request(server).delete("/api/packages/1");
    expect(res.body.msg).toEqual(
      expect.stringContaining("successfully deleted")
    );
  });
});
