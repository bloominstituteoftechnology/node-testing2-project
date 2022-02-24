const users = [
  { name: 'zion' },
  { name: 'auset' },
  { name: 'ausar' },
  { name: 'heru' },
]

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert(users);
    });
};

exports.users = users