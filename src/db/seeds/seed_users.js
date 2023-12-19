exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', password: 'password123'},
        {username: 'user2', password: 'password123'}
        // Add more users as needed
      ]);
    });
};

