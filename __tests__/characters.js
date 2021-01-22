const supertest = require("supertest")
const server = require("../favAnimeCharactersApi/server")
const db= require("../data/dbConfig")

beforeEach(async () => {
	await db.seed.run()
})

afterAll(async () => {
	await db.destroy() // closes the database connection
})

describe('get request to view favorite characters', ()=>{
    test("GET /", async () => {
        const res = await supertest(server).get("/chars")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBe(1)
        expect(res.body[0].name).toBe('vegeta')
    })  
})

describe('get favorite character by id', ()=>{
    test("GET /", async () => {
        const res = await supertest(server).get("/chars/1")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.id).toBe(1)
        expect(res.body.name).toBe('vegeta')
    })  
})

describe('add to favorite characters', ()=>{
    test("POST /", async () => {
        const res = await supertest(server).post("/chars").send({name: 'madara', anime: 'naruto', topTen: 'true', rank:'2'})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.id).toBe(2)
        expect(res.body.anime).toBe('naruto')
    })  
})

describe('edit a favorite character', ()=>{
    test("PUT /", async () => {
        const res = await supertest(server).put("/chars/1").send({name: 'vegeta', anime: 'dragonballZ', topTen: 'true', rank:1})
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        // expect(res.body.length).toBe(1)
        expect(res.body.name).toBe('vegeta')
        expect(res.body.anime).toBe('dragonballZ')
    })  
})

describe('get request to view favorite characters', ()=>{
    test("DELETE /", async () => {
        const res = await supertest(server).delete("/chars/1")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe('I guess they arent one of my favs afterall.')
    })  
})
