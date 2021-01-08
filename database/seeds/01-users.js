
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'testuser01', password: '1234', department: 'testing'},
        {username: 'testuser02', password: '1234', department: 'testing'},
        {username: 'testuser03', password: '1234', department: 'testing'},

      ]);
    });
};
