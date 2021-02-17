
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', password: 'password', department: 'Hosting'},
        {username: 'user2', password: 'password', department: 'Sales'},
        {username: 'user3', password: 'password', department: 'Sales'},
        {username: 'user6', password: 'password', department: 'Hosting'},
        {username: 'manager', password: 'password', department: 'Admin'},
        {username: 'manager2', password: 'password', department: 'Admin'},
      ]);
    });
};
