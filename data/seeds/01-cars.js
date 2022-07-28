const cars = [
  {
      vin: "JH4KA3270KC007497",
      make: "Ford",
      model: "F150",
      mileage: 86785,
      title: "clean",
      transmission: "automatic",
  },
  {
      vin: "3B7KF23Z91G223647",
      make: "Ford",
      model: "F150",
      mileage: 105000,
      title: "salvage",
      transmission: "automatic",
  },
]


exports.seed = async function(knex) {
  await knex('cars').truncate()
  await knex('cars').insert(cars) 
};
