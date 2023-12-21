
exports.seed = function(knex) {
  return knex('pokemons').truncate()
    .then(function () {
      return knex('pokemons').insert([
        {name: 'Feraligatr', level: 100},
        {name: 'Tyranitar', level: 75},
        {name: 'Totodile', level: 7},
        {name: 'Typhlosion', level: 90},
        {name: 'Scizor', level: 55},
        {name: 'Cyndaquil', level: 5}
      ]);
    });
};
