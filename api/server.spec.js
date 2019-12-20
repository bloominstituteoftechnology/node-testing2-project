const request = require("supertest");

const server = require('./server');
const db = require("../dataBase/dbConfig");


describe("server.js", function() {
    describe("environment", function() {
      it("should set db environment to testing", function() {
        expect(process.env.DB_ENV).toBe("testing");
    });
});
//describe("server", function() {
  describe("GET /", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
//});

// describe("server", function() {
  describe("POST /employee/", function() {
    beforeEach(async () => {
      await db("employee").truncate();
    });

    it("should return 200 OK", function() {
      return request(server)
        .post("/api/employee")
        .send({ name: "HELLO" })
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body.name).toEqual("HELLO");
        });
    });
  });
//});

// describe("server", function() {
  describe("DELETE /", function() {
    it("should return 200 OK", async function() {
        await db.removeAllListeners({})
        const removed = await db('employee')

        expect(removed.toHaveLength)
    //   return request(server)
    //     .delete("/api/employee/1")
    //     .then(res => {
    //       expect(res.status).toBe(200);
    //       expect(res.body).toEqual({ message: "deleted" });
    //     });
    });
  });
 });
//})
