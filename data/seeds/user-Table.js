
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'Hamid', password: 'Hamid' },
        { id: 2, username: 'Amin', password: 'Amin' }
      ]);
    });
};
