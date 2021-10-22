
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pets').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('pets').insert([
        { name: 'Buddy'},
        { name: 'Ella'},
        { name: 'Luna'},
        { name: 'Jack'}
      ]);
    });
};
