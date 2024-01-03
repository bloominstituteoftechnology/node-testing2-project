const request = require("supertest");
const db = require("../data/db-config");
const server = require("../server");

it("enviorment enviorment variable", () => {
  expect(process.env.DB_ENV).toBe("testing");
});
