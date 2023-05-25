const db = require('../../data/db-config')

function getAllRecipes(){
    return db('recipes')
}

function getRecipeId(recipe_id){
    return db('recipes').where('recipe_id', recipe_id)
        .first()
}

async function create(information){
    const [id] = await db('recipes').insert(information)
    return getRecipeId(id)
}

async function updateRecipe(recipe_id, information){
    await db('recipes').where('recipe_id', recipe_id).update(information)
    return getRecipeId(recipe_id)
}

function deleteRecipe (recipe_id){
   return db("recipes").where('recipe_id', recipe_id).del()
}

module.exports = {
    getAllRecipes,
    getRecipeId,
    create,
    updateRecipe,
    deleteRecipe,
}