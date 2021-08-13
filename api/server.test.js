const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");
const User = require("./users/users-model");

test("this is an empty test", () => {
  //empty test
});

// * * *  MVP
describe("server.js", () => {
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });

  beforeEach(async () => {
    await db("users").truncate();
  });

  afterAll(async () => {
    await db.destroy();
  });

  // test("Proper database env variable is set", () => {
  //   expect(process.env.DB_ENV).toEqual("testing");
  // });

  // describe("[GET] /", () => {
  //   test("returns in valid response", () => {
  //     return request(server)
  //       .get("/")
  //       .expect("Content-Type", /application\/json/)
  //       .expect(200, { api: "running" });
  //   });
  // });

  describe("[GET] /users", () => {
    test("returns an array of users", async () => {
      await db.seed.run();
      const res = await request(server).get("/users");
      expect(res.body).toHaveLength(4);
      res.body.forEach((user) => {
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("name");
      });
    });
  });

  describe("GET] /users/:id", () => {
    test("returns an user if exist", async () => {
      const { id } = await User.insert({ name: "Stan" });

      const res = await request(server).get(`/users/${id}`);

      expect(res.body).toMatchObject({ name: "Stan" });
    });
    test("returns 404 when the user doesn't exist", () => {
      return request(server)
        .get("/users/12345")
        .expect(404, { message: "User not found" });
    });
  });

  describe("[POST] /users", () => {
    test("creates a user and return it", async () => {
      const res = await request(server).post("/users").send({ name: "Stan" });
      expect(res.body).toMatchObject({ name: "Stan" });
      expect(await User.getById(res.body.id)).toMatchObject({ name: "Stan" });
    });
  });

  describe("[PUT] /users/:id", () => {
    test("updates the user if it exist", async () => {
      const user = await User.insert({ name: "Stan" });
      const res = await request(server)
        .put(`/users/${user.id}`)
        .send({ name: "Stan 1" });

      expect(res.body).toMatchObject({ name: "Stan 1" });
      expect(await User.getById(user.id)).toMatchObject({ name: "Stan 1" });
    });
    test(`returns a 404 if the user doesn't exist`, async () => {
      return request(server)
        .put("/users/123565")
        .send({ name: "Stan 1" })
        .expect(404, { message: "User not found" });
    });
  });

  describe("[DELETE] /users/:id", () => {
    test("deletes the user if exist", async () => {
      const user = await User.insert({ name: "Stan" });
      await request(server).delete(`/users/${user.id}`).expect(204);
      expect(await User.getById(user.id)).toBeUndefined();
    });

    test(`returns a 404 if the user doesn't exist`, async () => {
      return request(server)
        .delete("/users/12345")
        .expect(404, { message: "User not found" });
    });
  });
});
