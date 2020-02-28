const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe("server", () => {
    test("runs the tests", () => {
    expect(true).toBe(true);
    });

    // test("should use testing environment", () => {
    // expect(process.env.DATABASE_ENV).toBe("testing");
    // })
});


describe("POST to /api/users", () => {
    test("returns status 201 CREATED", () => {
        console.log(process.env.DATABASE_ENV)
        return request(server)
            .post("/api/users")
            .send({ name: "test_name" })
            .then(res => {
                expect(res.status).toBe(201);
        });
    });

    test("returns JSON formatted body", () => {
        return request(server)
            .post("/api/users")
            .then(res => {
                expect(res.type).toMatch(/json/);
        });
    });
});


describe("DELETE to /api/users", () => {
    beforeEach(async () => {
        await db("users").truncate();
    });

    test("returns status 200 OK", () => {
        return request(server)
            .post("/api/users") 
            .send({ name: "delete name" })
            .then(res => {
                return request(server)
                    .delete(`/api/users/${res.id}`)
                    .then(res => {
                        expect(res.status).toBe(200);
                });
            });
    })

    test("returns message successful", () => {
        return request(server)
            .post("/api/users") 
            .send({ name: "delete name" })
            .then(res => {
                return request(server)
                    .delete(`/api/users/${res.id}`)
                    .then(res => {
                        expect(res.body.message).toBe("User deleted!");
                });
            });
    });
});