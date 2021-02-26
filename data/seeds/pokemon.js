
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pokemon').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon').insert([
        {id: 1, name: 'Bulbasaur'},
        {id: 2, name: 'Ivysaur'},
        {id: 3, name: 'Venasaur'}
      ]);
    });
};
