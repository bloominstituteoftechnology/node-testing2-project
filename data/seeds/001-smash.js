exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('smash')
    .truncate()
    .then(function() {
      return knex('smash').insert([
        { name: 'Kirby', series: 'Kirby' },
        { name: 'Incineroar', series: 'Pokemon' },
        { name: 'Sora', series: 'Kingdom Hearts' },
        { name: 'Cloud', series: 'Final Fantasy' },
      ]);
    });
};