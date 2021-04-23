const request = require("supertest")
const db = require("./data/dbconfig.js")
const server = require("./api/server.js")

const stav = {username:"Stav", password:"1234", role_id: 1}
const sam = {username:"Sam", password:"12345", role_id: 1}

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async ()=>{
    await db("users").truncate()
    await db("roles").truncate()
    await db("roles").insert({role_name:'student'})
    await db("roles").insert({role_name:'instructor'})
})
afterAll(async ()=>{
    await db.destroy()
})

describe("server",()=>{
    describe("Getting a user", ()=>{
        it("Retrieves users", async ()=>{
            await db("users").insert(stav)
            await db("users").insert(sam)
            let res = await request(server).get("/api/user")
            expect(res.body).toHaveLength(2)
        })
    })
    describe("Creating a user", ()=>{
        it("adds a user to the database", async ()=>{
            let res
            await request(server).post("/api/user").send(stav)
            res = await db("users")
            expect(res).toHaveLength(1)

            await request(server).post("/api/user").send(sam)
            res = await db("users")
            expect(res).toHaveLength(2)
        })
        it("responds with newly created user", async ()=>{
            let res 
            res = await request(server).post("/api/user").send(stav)
            expect(res.body).toHaveProperty("username")
            expect(res.body.username).toEqual(stav.username)

            res = await request(server).post("/api/user").send(sam)
            expect(res.body).toHaveProperty("username")
            expect(res.body.username).toEqual(sam.username)
        })
    })
    describe("Deleting a user", ()=>{
        it("Removes user from database", async ()=>{
            let res = await db("users")
            expect(res).toHaveLength(0)
            await db("users").insert(stav)
            await db("users").insert(sam)
            res = await db("users")
            expect(res).toHaveLength(2)

            await request(server).delete("/api/user/1")
            res = await db("users")
            expect(res).toHaveLength(1)

            await request(server).delete("/api/user/2")
            res = await db("users")
            expect(res).toHaveLength(0)
        })
    })
})


