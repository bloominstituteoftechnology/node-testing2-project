
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('students')
    .truncate()
    .then(function() {
      return knex('students').insert([
        { name: 'sri' },
        { name: 'greg' },
        { name: 'mike' },
        { name: 'anil' },
      ]);
    });
};

