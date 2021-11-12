const houses = [
  { name: 'sam' },
  { name: 'frodo' },
  { name: 'pippin' },
  { name: 'merry' },
]

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('houses')
    .truncate()
    .then(function() {
      return knex('houses').insert(houses);
    });
};

exports.houses = houses