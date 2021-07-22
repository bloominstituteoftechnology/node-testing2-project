
exports.seed = function(knex) {
  return knex('resources').truncate()
    .then(function () {
      return knex('resources').insert([
        { name: 'naruto' },
        { name: 'sasuke' },
        { name: 'sakura' }
      ]);
    });
};
