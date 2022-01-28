
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        { name: 'Coco' },
        { name: 'Luca' },
        { name: 'Avatar' },
        { name: 'Nemo' },
      ]);
    });
};
