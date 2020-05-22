
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "jesus1", password: "jesus1"},
        {username: "jesus2", password: "jesus2"},
        {username: "jesus3", password: "jesus3"},
      ]);
    });
};
