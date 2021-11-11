
exports.seed = function(knex) {
    return knex('sample').insert([
      {id: 1, name: 'dalai'},
      {id: 2, name: 'chelsea'},
      {id: 3, name: 'mozie'}
    ]);
};
