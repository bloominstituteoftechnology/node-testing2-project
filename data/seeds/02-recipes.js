const recipes = [
    {recipe_name: 'Chicken sandwich'},
    {recipe_name: 'Spaghetti'},
    {recipe_name: 'Homemade meatballs'},
    {recipe_name: 'Ribs'},
    {recipe_name: 'Lemon butter chicken'}
]

exports.seed = async function (knex) {
    await knex('recipes').insert(recipes)
}