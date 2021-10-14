const request = require('supertest')
const db = require("../../data/dbConfig")
const server = require("../../api/server")

const joke1 = {
    joke_name: "steven's joke",
    main_joke: "why did the chicken cross the road?",
    joke_punchline: "because it was free range!"
}

const joke2 = {
    joke_name: "allison's joke",
    main_joke: "why did the chicken cross the road?",
    joke_punchline: "I don't know, I have a hard time make decisions!"
}

it("correct environment variable", ()=>{
    expect(process.env.DB_ENV).toBe('testing')
})