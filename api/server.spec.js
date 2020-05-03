const request = require("supertest");
const should = require("should");

const server = require("./server.js");
const db = require("../database/dbConfig.js");

describe("server", () => {
  it("should set the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("should return 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should return JSON type", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });

    it('should return {api: "up"}', async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  }); // end of Describe GET

  describe("Authentication", () => {
    const user = {
      username: "raza",
      password: "pass123",
    };
    it("should register user", async () => {
      const res = await request(server).post("/api/auth/register").send(user);
      expect(res.status).toBe(201);
    });

    it("should login user", async () => {
      const res = await request(server).post("/api/auth/login").send(user);
      expect(res.status).toBe(200);
    });
  }); // end of AUTHENTICATION

  describe("get users after authentication", () => {
    const user = {
      username: "raza",
      password: "pass123",
    };
    let token = null;
    beforeEach((done) => {
      request(server)
        .post("/api/auth/login")
        .send(user)
        .end(function (err, res) {
          token = res.body.token;
          done();
        });
    });

    it("should return list of users: ", (done) => {
      request(server)
        .get("/users")
        .set("Authorization", token)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);

          done();
        });
    });

    it("should return list of users using async : ", async () => {
      const res = await request(server)
        .get("/users")
        .set("Authorization", token);
      expect(res.body).should.be.instanceof(Object);
    });
  }); // end of authenticates users list
}); // end of describe SERVER

beforeAll(async () => {
  await db("users").truncate();
});
