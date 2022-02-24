
exports.seed = function(knex) {
  return knex('avengers').del()
    .then(function () {
      return knex('avengers').insert([
        { secret_identity: 'Captain America' },
        { secret_identity: 'Iron Man' },
        { secret_identity: 'Black Widow' },
        { secret_identity: 'Scarlet Witch' }
      ]);
    });
};
