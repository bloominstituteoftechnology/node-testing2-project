require("dotenv").config();

const request = require("supertest");
const server = require("../server/server.js");

describe("packages router", () => {
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
