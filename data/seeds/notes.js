
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'title one', description: 'this is a note'},
        {id: 2, title: 'title two', description: 'this is a note'},
        {id: 3, title: 'title three', description: 'this is a note'}
      ]);
    });
};
