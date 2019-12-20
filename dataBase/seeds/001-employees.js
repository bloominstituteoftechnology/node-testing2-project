
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employee').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('employee').insert([
        { name: "carlos"},
        { name: "tim"},
        { name: "ale"}
      ]);
    });
};
