exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert([
    { year: 2016, make: "Dodge", model: "Challenger R/T" },
    { year: 2020, make: "Chevrolet", model: "Corvette SS" },
    { year: 2018, make: "Ford", model: "Mustang GT" },
  ]);
};
