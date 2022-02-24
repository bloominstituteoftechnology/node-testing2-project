exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("players")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("players").insert([
        { name: "lebron", age: 37 },
        { name: "stephen", age: 33 },
        { name: "de-aaron", age: 23 },
        { name: "kevin", age: 34 },
      ]);
    });
};
