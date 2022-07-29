const cars = [
  {
      make: "Ford",
      model: "F150",
      transmission: "automatic",
  },
  {
      make: "Ford",
      model: "F150",
      transmission: "automatic",
  },
]


exports.seed = async function(knex) {
  await knex('cars').truncate()
  await knex('cars').insert(cars) 
};
