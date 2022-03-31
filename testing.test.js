const request = require("supertest");
const server = require("./api/server");
const db = require("./data/db-config");
const bcrypt = require("bcryptjs");
const jwtDecode = require("jwt-decode");

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

test("[1] sanity check", () => {
  expect(true).not.toBe(false);
});

describe("server.js", () => {
  describe("[POST] /api/auth/login", () => {
    test("[2] Has the correct message on valid login info", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "bob", password: "1234" });
      expect(res.body.message).toMatch(/welcome bob!/i);
    }, 1000);
    test("[3] Has the correct status and message on invalid login info", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "bobsy", password: "1234" });
      expect(res.body.message).toMatch(/invalid login info/i);
      expect(res.status).toBe(401);
      res = await request(server)
        .post("/api/auth/login")
        .send({ username: "bob", password: "12345" });
      expect(res.body.message).toMatch(/invalid login info/i);
      expect(res.status).toBe(401);
    }, 1000);
    test("[4] Has a token with correct { subject, username, role_name, exp, iat }", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "bob", password: "1234" });
      let decoded = jwtDecode(res.body.token);
      expect(decoded).toHaveProperty("iat");
      expect(decoded).toHaveProperty("exp");
      expect(decoded).toMatchObject({
        subject: 1,
        role_name: "teacher",
        username: "bob",
      });
      res = await request(server)
        .post("/api/auth/login")
        .send({ username: "sue", password: "1234" });
      decoded = jwtDecode(res.body.token);
      expect(decoded).toHaveProperty("iat");
      expect(decoded).toHaveProperty("exp");
      expect(decoded).toMatchObject({
        subject: 2,
        role_name: "assistant",
        username: "sue",
      });
    }, 1000);
  });
  describe("[POST] /api/auth/register", () => {
    test("[5] Makes a new user in the database when client does not provide role_name", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "doopy", password: "1234" });
      const doopy = await db("users").where("username", "doopy").first();
      expect(doopy).toMatchObject({ username: "doopy" });
    }, 1000);
    test("[6] Makes a new user with role_id 3 (the default role) when client does not provide role_name", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "doopy", password: "1234" });
      const doopy = await db("users").where("username", "doopy").first();
      expect(doopy).toMatchObject({ role_id: 2 });
    }, 1000);
    test("[7] Makes a new user with role_id 2 (existing role assistant) when client provides role_name assistant", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "doopy", password: "1234", role_name: "assistant" });
      const doopy = await db("users").where("username", "doopy").first();
      expect(doopy).toMatchObject({ role_id: 3 });
    }, 1000);
    test("[8] Makes a new user with a brand new role_id when client provides a role_name that does not exist yet", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "doopy", password: "1234", role_name: "valid" });
      const doopy = await db("users").where("username", "doopy").first();
      expect(doopy).toMatchObject({ role_id: 4 });
    }, 1000);
    test("[9] saves the user with a bcrypted password instead of plain text", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "doopy", password: "1234" });
      const doopy = await db("users").where("username", "doopy").first();
      expect(bcrypt.compareSync("1234", doopy.password)).toBeTruthy();
    }, 1000);
    test("[10] Has the correct user (when omitting role_name from the request)", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "doopy", password: "1234" });
      expect(res.body).toMatchObject({
        user_id: 3,
        username: "doopy",
        role_name: "student",
      });
    }, 1000);
    test("[11] Has the correct user (when choosing a valid role_name not in db)", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "doopy", password: "1234", role_name: "angel" });
      expect(res.body).toMatchObject({
        user_id: 3,
        username: "doopy",
        role_name: "angel",
      });
    }, 1000);
    test("[12] leading and trailing whitespace is trimmed from the role_id", async () => {
      const res = await request(server).post("/api/auth/register").send({
        username: "doopy",
        password: "1234",
        role_name: "    angel    ",
      });
      expect(res.body).toMatchObject({
        user_id: 3,
        username: "doopy",
        role_name: "angel",
      });
    }, 1000);
    test("[13] leading and trailing whitespace is trimmed from the role_id before validating", async () => {
      const res = await request(server).post("/api/auth/register").send({
        username: "doopy",
        password: "1234",
        role_name: "              angel              ",
      });
      expect(res.body).toMatchObject({
        user_id: 3,
        username: "doopy",
        role_name: "angel",
      });
    }, 1000);
    test("[14] Has proper status and message on role_name over 32 chars after trimming", async () => {
      const res = await request(server).post("/api/auth/register").send({
        username: "doopy",
        password: "1234",
        role_name: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      });
      expect(res.body.message).toMatch(/can not be longer than 32 chars/i);
      expect(res.status).toBe(422);
    }, 1000);
    test("[15] Has proper status and message if a client tries to register as a teacher", async () => {
      let res = await request(server)
        .post("/api/auth/register")
        .send({ username: "doopy", password: "1234", role_name: "teacher" });
      expect(res.body.message).toMatch(/can not be teacher/i);
      expect(res.status).toBe(422);
      res = await request(server).post("/api/auth/register").send({
        username: "doopy",
        password: "1234",
        role_name: "    teacher     ",
      });
      expect(res.body.message).toMatch(/can not be teacher/i);
      expect(res.status).toBe(422);
    }, 1000);
    test("[16] Has proper status on success", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "doopy", password: "1234" });
      expect(res.status).toBe(201);
    }, 1000);
  });
  describe("[GET] /api/users", () => {
    test("[17] requests without a token are bounced with proper status and message", async () => {
      const res = await request(server).get("/api/users");
      expect(res.body.message).toMatch(/token required/i);
    }, 1000);
    test("[18] requests with an invalid token are bounced with proper status and message", async () => {
      const res = await request(server)
        .get("/api/users")
        .set("Authorization", "foobar");
      expect(res.body.message).toMatch(/token invalid/i);
    }, 1000);
    test("[19] requests with a valid token obtain a list of users", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "bob", password: "1234" });
      res = await request(server)
        .get("/api/users")
        .set("Authorization", res.body.token);
      expect(res.body).toMatchObject([
        { role_name: "teacher", user_id: 1, username: "bob" },
        { role_name: "assistant", user_id: 2, username: "sue" },
      ]);
    }, 1000);
  });
  describe("[GET] /api/users/:user_id", () => {
    test("[20] requests with a token with role_name teacher obtain the user details", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "bob", password: "1234" });
      res = await request(server)
        .get("/api/users/1")
        .set("Authorization", res.body.token);
      expect(res.body).toMatchObject({
        role_name: "teacher",
        user_id: 1,
        username: "bob",
      });
    }, 1000);
    test("[21] requests with a token with a role_name that is not teacher are bounced with proper status and message", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "sue", password: "1234" });
      res = await request(server)
        .get("/api/users/1")
        .set("Authorization", res.body.token);
      expect(res.body.message).toMatch(/this is not for you/i);
      expect(res.status).toBe(403);
    }, 1000);
  });
});
