const request = require("supertest")
const db = require('../../data/db-config')
const server = require('../server')
const Recipe = require('./recipes-model')

const recipe1 = {recipe_name: "pasta", ingredient_name: "noodle", step_text: "stir it up", step_number: 1, quantity: 1}

const recipe2 = {recipe_name: "poosta", ingredient_name: "noooooodle", step_text: "stoooor it up", step_number: 2, quantity: 2}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('recipes').truncate()
})

afterAll(async () => {
    await db.destroy()
})

it("correct env var", () => {
    expect(process.env.DB_ENV).toBe("testing")
})

describe("recipe model functions", () => {
    describe("create recipe", () => {
        it("adds recipe to db", async () => {
            let recipes
            await Recipe.createRecipe(recipe1)
            recipes = await db('recipes')
            expect(recipes).toHaveLenght(1)

            await Recipe.createRecipe(recipe2)
            recipes = await db('recipes')
            expect(recipes).toHaveLenght(2)
        })
    })
})