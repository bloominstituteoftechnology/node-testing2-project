
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pokemon').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon').insert([
        {id: 1, name: 'Bulbasaur', pokedex_number:1},
        {id: 2, name: 'Ivysaur', pokedex_number:2},
        {id: 3, name: 'Venasaur', pokedex_number:3}
      ]);
    });
};
