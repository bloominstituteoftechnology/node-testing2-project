const request = require("supertest");

const server = require("../api/server.js");

it("should set db environment to testing", function () {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("server", function() {
  describe("GET /users", function() {
    it("should return 200", function() {
      return request(server)
        .get("/users")
        .then(res => {
          expect(res.status).toBe(200);
        })
    })

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/users")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    // it("should return an array of user objects", function() {
    //   return request(server)
    //     .get("/users")
    //     .then(res => {
    //       expect(res.type).toMatch(/json/i);
    //     });
    // });

  })
})

it.todo("should get a list of users");
it.todo("should post a new user");
it.todo("should delete a user");