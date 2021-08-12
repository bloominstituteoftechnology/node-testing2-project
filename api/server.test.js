const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

const User = require("./users/users-model");

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

  test("Proper database env variable is set", () => {
    expect(process.env.DB_ENV).toEqual("testing");
  });

  describe("GET] /users", () => {
    it("returns an array of users", async () => {
      await db.seed.run();

      const res = await request(server).get("/users");

      expect(res.body).toHaveLength(4);

      res.body.beforeEach((user) => {
        expect(user).tohaveProperty("id");
        expect(user).tohaveProperty("name");
      });
    });
  });

  // describe('[GET] /users/:id', ()=> {
  // it('returns a user when it exist')
  //   })

  describe("[DELETE] /users/:id", () => {
    it("deletes the user if exist", async () => {
      const user = await User.insert({ name: "Stan" });
      await request(server).delete(`/users/${user.id}`).expect(204);

      expect(await User.getById(user.id)).toBeUndefined();
    });
    it(`returns a 404 if the user doesn't exist`, async () => {
      return request(server)
        .delete("/users/12345")
        .expect(404, { message: "User not found" });
    });
  });
});
