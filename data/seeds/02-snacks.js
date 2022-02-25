
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('snacks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('snacks').insert([
        {snack_name: 'corn dog nuggets', park_id: 1},
        {snack_name: 'Street Corn', park_id: 2},
        {snack_name: 'Poutine', park_id: 3},
        {snack_name: 'Wookie Cookie', park_id: 4}
      ]);
    });
};
