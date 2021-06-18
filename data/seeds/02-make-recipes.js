const recipes = [
    { recipe_name: "Star-nosed Mole" }, 
    { recipe_name: "Platypus" }, 
    { recipe_name: "Chameleon" }, 
]

const ingredients = [
    { ingredient_name: "Snuffles", ingredient_unit: 'lbs' },
    { ingredient_name: "Cornelius", ingredient_unit: 'lbs' },
    { ingredient_name: "Athena", ingredient_unit: 'lbs' },
    { ingredient_name: "Ares", ingredient_unit: 'lbs' },
    { ingredient_name: "Snelby", ingredient_unit: 'lbs' },
    { ingredient_name: "Gwendolyn", ingredient_unit: 'lbs' },
    { ingredient_name: "Archebald", ingredient_unit: 'lbs' },
    { ingredient_name: "Polonius", ingredient_unit: 'lbs' },
    { ingredient_name: "Augusta", ingredient_unit: 'lbs' },
    { ingredient_name: "Stephen", ingredient_unit: 'lbs' },
    { ingredient_name: "Rocky", ingredient_unit: 'lbs' },
]

const steps = [
    { step_text: "Snuffles", step_number: 1, recipe_id: 1 },
    { step_text: "Cornelius", step_number: 1, recipe_id: 2 },
    { step_text: "Athena", step_number: 1, recipe_id: 3 },
    { step_text: "Ares", step_number: 1, recipe_id: 3 },
    { step_text: "Snelby", step_number: 1, recipe_id: 4 },
    { step_text: "Gwendolyn", step_number: 1, recipe_id: 5 },
    { step_text: "Archebald", step_number: 1, recipe_id: 6 },
    { step_text: "Polonius", step_number: 1, recipe_id: 1 },
    { step_text: "Augusta", step_number: 1, recipe_id: 4 },
    { step_text: "Stephen", step_number: 1, recipe_id: 7 },
    { step_text: "Rocky", step_number: 1, recipe_id: 8 },
]

exports.seed = async function(knex) {
    await knex('recipes').insert(recipes)
    await knex('ingredients').insert(ingredients)
    await knex('steps').insert(steps)
    await knex('step_ingredients').insert(step_ingredients)
  };