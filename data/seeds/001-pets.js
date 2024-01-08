
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pets')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('pets').insert([
        { name: 'Cooper' },
        { name: 'Molly' },
        { name: 'Charlie' }
      ]);
    });
};
