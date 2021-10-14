exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'ehsan',
          age: 20,
        },
        {
          name: 'john',
          age: 21,
        },
        {
          name: 'tom',
          age: 22,
        },
      ]);
    });
};
