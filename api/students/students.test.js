const request = require("supertest");
const db = require("../../data/dbConfig");
const server = require("../server");
const Student = require("./students-model");

const s1 = { name: "gaurav" };
const s2 = { name: "smith" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
}); // migrate
beforeEach(async () => {
  await db("students").truncate();
});
afterAll(async () => {
  await db.destroy();
}); // disconnect from the db
//   beforeEach(async () => {
//     await db.seed.run()
//   }) // truncate and seed fresh data

test("is the correct environment", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("students model function", () => {
  describe("[CREATE] create student", () => {
    test("it adds student to the db", async () => {
      await Student.createStudent(s1);
      const students = await db("students");
      expect(students).toHaveLength(1);

    });
    test("inserted student name", async () => {
      const student = await Student.createStudent(s1);
      expect(student).toMatchObject({ id: 1, name: "gaurav" });
    });
  }); //create student
  describe("[DELETE] delete student", () => {
    test("it removes student from the db", async () => {
      const [id ] = await db("students").insert(s1);
      let student = await db("students").where({ id }).first();
      expect(student).toMatchObject({ id: 1, name: "gaurav" });
      expect(student).toBeTruthy()
      await request(server).delete("/api/students/" + id);
       student = await db("students").where({ id }).first();
       console.log("student:", student)
       expect(student).toBeFalsy();
    });
    test("respond with the deleted student", async ()=>{
        await db("students").insert(s1)
        let student = await request(server).delete("/api/students/1")
        expect(student.body).toMatchObject(s1)
    })
  });
});
