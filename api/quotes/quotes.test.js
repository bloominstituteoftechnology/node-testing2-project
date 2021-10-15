const db = require('../../data/db-config.js')
const request = require("supertest")
const server = require("../server.js")
const Quotes = require('./quotesModel.js')


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('quotes').truncate()
})

afterAll(async () => {
    await db.destroy()
})


it('is env working', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

it('Add a quote', async () => {

    await Quotes.insert({ quote: "The way to get started is to quit talking and begin doing."})
    const newQuote = await db('quotes')

    expect(newQuote).toHaveLength(1)
})

it('deletes a quote', async () => {


})

