/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, name: 'Rober F', address: '123 Rd, CA 12345'},
        {user_id: 2, name: 'Cian G', address: '456 Rd, NY 12345'},
        {user_id: 3, name: 'Julie H', address: '789 Rd, FL 12345'}
      ]);
    });
};
