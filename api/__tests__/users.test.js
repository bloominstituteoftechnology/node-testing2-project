const db = require("../../database/db-config");
const request = require("supertest");
const server = require("../server");

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run();
})

const matcher = [
    { "id": 1, "married": true, "name": "jacob" },
    { "id": 2, "married": false, "name": "alfred" },
    { "id": 3, "married": false, "name": "louis" },
    { "id": 4, "married": true, "name": "alaina" },
    { "id": 5, "married": false, "name": "bilbo" },
]

describe("[GET] /api/users", () => {
    test("[1]Resolves a list of all users", async () => {
        const res = await request(server).get("/api/users");
        expect(res.body).toHaveLength(5);
        expect(res.body).toEqual(matcher);
        expect(res.body).toMatchObject(matcher);
    })
})

describe("[GET] /api/users/:id",() => {
    test("[2]Resolves a list of user with a given id",async()=> {
        let res = await request(server).get("/api/users/1");
        expect(res.body).toMatchObject([{id : 1, name : "jacob", married : true}]);
        expect(res.status).toBe(200);
        res = await request(server).get("/api/users/2");
        expect(res.body).toMatchObject([{id : 2, name : "alfred", married : false}]);
        res = await request(server).get("/api/users/3");
        expect(res.body).toMatchObject([{id : 3, name : "louis", married : false}]);
        res = await request(server).get("/api/users/4");
        expect(res.body).toMatchObject([{id : 4, name : "alaina", married : true}]);
        res = await request(server).get("/api/users/5");
        expect(res.body).toMatchObject([{id : 5, name : "bilbo", married : false}]);
        res = await request(server).get("/api/users/10");
        expect(res.body.message).toBe("id does not exist"); 
    })
})

describe("[POST] /api/users",() => {
    test("[3]Returns the newly created user",async()=> {
        const user = {name : "test", married : true}
        let res = await request(server).post("/api/users").send(user);
        expect(res.status).toBe(201)
        expect(res.body).toMatchObject([{id : 6, name : "test", married : true}]);
        expect(res.body).toHaveLength(1); 
    })
    test("[4]Returns error for incorrect user",async() => {
        const user = {name : "test"};
        let res = await request(server).post("/api/users").send(user);
        expect(res.status).toBe(422)
        expect(res.body.message).toBe('need name and married status')
    })
})

describe("[PUT] /api/users/:id",() => {
    test("[5]Returns new updated user",async() => {
        const user = {name : "JACOBJACOB", married : true};
        const expected = {...user, id : 1};
        let res = await request(server).put("/api/users/1").send(user);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject([expected]);
    })
    test("[6]Returns error for incorrect update",async()=> {
        const user = {name : "JACOBJACOB"};
        const expected = "need name, id, and married status"
        let res = await request(server).put("/api/users/1").send(user);
        expect(res.body.message).toBe(expected);
        expect(res.status).toBe(422);
    })
})

describe("[DELETE] /api/users/:id",() => {
    test("[7]Returns verified list of users showing deletion was successful",async() => {
        const idToDelete = 1; 
        const expected = [...matcher];
        expected.splice(idToDelete - 1,1);
        const res = await request(server).delete("/api/users/1");
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(expected)
    })
    test("[8]Return error response for id that does not exist",async()=> {
        const res = await request(server).delete("/api/users/10");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("id does not exist")
    })
})