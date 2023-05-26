const request = require('supertest')
const db = require('../../data/db-config')
const server = require('../server')
const Recipe = require('../recipes/recipes-model')

const food1 = {recipe_name: 'Fried pickles'}
const food2 = {recipe_name: 'Butter beans'}


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('recipes').truncate()
})

beforeEach(async () => {
    await db.seed.run()
})



afterAll(async () => {
    await db.destroy()
})


it('correct env', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('create', () => {
    it('proof that the insert works', async () => {
        let recipes
        await Recipe.create(food1)
        recipes = await db('recipes')
        expect(recipes).toHaveLength(6)
    })
    it('proof that you can add multiple food and work', async () => {
        let recipes
        await Recipe.create(food1)
        await Recipe.create(food2)
        recipes = await db('recipes')
        expect(recipes).toHaveLength(7)
    })
    it('check if it matches the contents', async () => {
        const recipe = await Recipe.create(food1)
        expect(recipe).toMatchObject({...recipe})
    })
})

describe('getAll', () => {
    it('it gets an array of objects back', async () => {
        const recipes = await Recipe.getAllRecipes()
        expect(recipes).toHaveLength(5)
    })
})
describe('getById', () =>  {
    it('it gets the first obj back', async () =>{
        const recipe = await Recipe.getRecipeId(1)
        expect(recipe).toMatchObject({...recipe})
    })
})
describe('delete', () => {
    it('check the array after the removing the id', async () => {
        await Recipe.deleteRecipe(1)
        const recipes = await Recipe.getAllRecipes()
        expect(recipes).toHaveLength(4)
    })
})

describe('[DELETE] / - delete recipe', () => {
    it('removes recipes from db', async () => {
        const [recipe_id] = await db('recipes').insert(food1)
        let recipe = await db('recipes').where({recipe_id}).first()
        expect(recipe).toBeTruthy

        await request(server).delete('/recipes/'+ recipe_id)
        recipe = await db('recipes').where({recipe_id}).first()
        expect(recipe).toBeFalsy
    })
})

describe('[GET] get all recipes', () => {
    it('get all recipes from db', async () => {
        await request(server).get('/recipes')
    })
})

describe('[GET] by id', () => {
    it('gets a recipe', async () =>  {
        const [recipe_id] = await db('recipes').insert(food1)
        let recipe = await db('recipes').where({recipe_id}).first()
        expect(recipe).toBeTruthy

      const singleRecipe  = await request(server).get('/recipes/'+recipe_id)
      expect(singleRecipe).toBeTruthy
    })
})