
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pokemon').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon').insert([
        {pokemon_name: 'Piplup', max_hp: 32},
        {pokemon_name: 'Chimchar', max_hp: 32},
        {pokemon_name: 'Totodile', max_hp: 32}
      ]);
    });
};
