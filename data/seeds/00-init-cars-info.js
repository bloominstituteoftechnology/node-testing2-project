exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cars-info")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("cars-info").insert([
        { id: 1, make: "toyota", model: "corolla", year: 2008 },
        { id: 2, make: "nissan", model: "altima", year: 2018 },
        { id: 3, make: "honda", model: "accord", year: 2012 },
      ]);
    });
};
