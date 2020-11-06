
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('vampires').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('vampires').insert([
        {id: 1, name: 'Lestat de Lioncourt', age_turned: '20', birth_year: '1758', still_alive: true},
      ]);
    });
};
