
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('hobbits').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('hobbits').insert([
        {name: 'Frodo'},
        {name: 'Samwise'},
        {name: 'Bilbo'},
        {name: 'Merry'},
        {name: 'Pippin'}
      ]);
    });
};
