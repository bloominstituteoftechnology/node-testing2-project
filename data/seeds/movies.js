
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {id: 1, name: 'Coco' },
        {id: 2, name: 'Luca' },
        {id: 3, name: 'Avatar' },
        {id: 4, name: 'Nemo' },
      ]);
    });
};
