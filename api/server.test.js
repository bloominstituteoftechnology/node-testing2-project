const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("./server.js");

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=>{
    await db("breweries").truncate()
})

afterAll(async ()=>{
    await db.destroy()
})