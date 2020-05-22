const supertest = require("supertest");
const server = require("./server");
const model = require("../users/users-model");
const db = require("../database/connection");

describe("server", () => {
  it("can run", () => {
    expect(true).toBeTruthy();
  });
});
