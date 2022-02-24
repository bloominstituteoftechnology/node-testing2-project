const request = require("supertest");
const server = require("../server");
const db = require("../../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy(); // disconnects from db
});

it("is the correct env", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("children router", () => {
  describe("[GET] /children", () => {
    let res;
    beforeEach(async () => {
      res = await request(server).get("/children");
    });

    it("responds with 200", async () => {
      expect(res.status).toBe(200);
    });
    it("responds with all children", async () => {
      expect(res.body).toHaveLength(4);
    });
  });
  describe("[GET] /children/1", () => {
    let res;
    beforeEach(async () => {
      res = await request(server).get("/children/1");
    });

    it("responds with 200", async () => {
      expect(res.status).toBe(200);
    });
    it("responds with one child", async () => {
      expect(res.body).toMatchObject({
        child_id: 1,
        first_name: "Darwin",
        hobbies: "chicken-tending",
        last_name: "Madden",
      });
    });
    it("responds with the correct child", async () => {
      expect(res.body.child_id).toBe(1);
    });
  });
  describe("[POST] /children with full info", () => {
    const fullChild = {
      first_name: "Wednesday",
      last_name: "Madden",
      hobbies: "napping",
    };

    let res;
    beforeEach(async () => {
      res = await request(server).post("/children").send(fullChild);
    });

    it("responds with 201", async () => {
      expect(res.status).toBe(201);
    });
    it("resolves to new child", async () => {
      expect(res.body).toMatchObject(fullChild);
    });
  });
  describe("[POST] /children with no hobby", () => {
    const partChild = {
      first_name: "Wednesday",
      last_name: "Madden",
    };

    let res;
    beforeEach(async () => {
      res = await request(server).post("/children").send(partChild);
    });

    it("responds with 201", async () => {
      expect(res.status).toBe(201);
    });
    it("resolves to new child", async () => {
      expect(res.body).toMatchObject(partChild);
    });
  });
  describe("[POST] /children with no last_name", () => {
    const brokeChild = {
      first_name: "Wednesday",
    };

    let res;
    beforeEach(async () => {
      res = await request(server).post("/children").send(brokeChild);
    });

    it("responds with 500", async () => {
      expect(res.status).toBe(500);
    });
  });
});
