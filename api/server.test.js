const db = require("../data/db-config");
const request = require("supertest");
const server = require("./server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("[GET] /students", () => {
  test("[1] Responds with a status 200 OK", async () => {
    const res = await request(server).get("/students");
    expect(res.status).toBe(200);
  });
  test("[2] Responds with correct student at index 0", async () => {
    const res = await request(server).get("/students");
    expect(res.body[0]).toEqual({ age: 21, id: 1, name: "jordon" });
  });
  test("[3] Responds with number of students", async () => {
    const res = await request(server).get("/students");
    expect(res.body).toHaveLength(7);
  });

  describe("[GET] /students/:id", () => {
    test("[4] Responds with a status 200 OK", async () => {
      const res = await request(server).get("/students/1");
      expect(res.status).toBe(200);
    });
    test("[5] Responds with correct student", async () => {
      const res = await request(server).get("/students/1");
      expect(res.body).toMatchObject({ age: 21, id: 1, name: "jordon" });
    });
  });

  describe("[POST] /students", () => {
    test("[6] Responds with a status 201 success", async () => {
      const res = await request(server)
        .post("/students")
        .send({ age: 45, name: "JP" });
      expect(res.status).toBe(201);
    });
    test("[7] Responds with the student posted", async () => {
      const res = await request(server)
        .post("/students")
        .send({ age: 45, name: "JP" });
      expect(res.body).toMatchObject({ age: 45, name: "JP" });
    });
  });
  describe("[PUT] /students/:id", () => {
    test("[8] Responds with status 201", async () => {
      const res = await request(server)
        .put("/students/1")
        .send({ name: "JPAY" });
      expect(res.status).toBe(201);
    });
    test("[9] Responds with updated student", async () => {
      const res = await request(server)
        .put("/students/1")
        .send({ name: "JPAY" });
      expect(res.body).toMatchObject({ id: 1, name: "JPAY", age: 21 });
    });
  });
});
