exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("cars").insert([
        { model: "focus" },
        { model: "charger" },
        { model: "pinto" },
      ]);
    });
};
