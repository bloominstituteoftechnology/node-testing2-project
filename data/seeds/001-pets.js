const pets = [
  { name: 'clem' },
  { name: 'winston' },
  { name: 'boris' },
  { name: 'stanley' },
]

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('pets')
    .truncate()
    .then(function() {
      return knex('pets').insert(pets);
    });
};

exports.pets = hobbits
