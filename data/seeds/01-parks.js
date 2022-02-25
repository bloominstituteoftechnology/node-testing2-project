
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('parks').insert([
        {park_name: 'Magic Kingdom'},
        {park_name: 'Animal Kingdom'},
        {park_name: 'Epcot'},
        {park_name: 'Hollywood Studios'}
      ]);
    });
};
