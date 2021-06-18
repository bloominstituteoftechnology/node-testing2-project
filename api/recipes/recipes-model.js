const db = require('../../data/db-config')

function getRecipeById(recipe_id) {
    return 
}

async function createRecipe(recipe) {
    const [id] = await db('jokes').insert(recipe)
    return db('recipes').where('recipe_id', id).first()
}

module.exports = { 
    getRecipeById, 
    createRecipe,
}