
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Danny', password:"a234234sdfsadf34sdfdas"},
        {id: 2, username: 'Joe', password:"asdfgggddfdasdf234fdsf"},
        {id: 3, username: 'Ashley', password:"df454sdddf4rfdfsdsfdfs"}
      ]);
    });
};



