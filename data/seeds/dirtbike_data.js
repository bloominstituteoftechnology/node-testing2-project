exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("dirtbikes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("dirtbikes").insert([
        { brand: "honda", size: 250, price: 5000 },
        { brand: "suzuki", size: 125, price: 3000 },
        { brand: "yamaha", size: 80, price: 1000 },
      ]);
    });
};
