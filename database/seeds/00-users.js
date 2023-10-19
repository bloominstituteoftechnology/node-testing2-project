/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').truncate()
  await knex('users').insert([
    { name: 'jacob', married: true },
    { name: 'alfred', married: false },
    { name: 'louis', married: 0 },
    { name: 'alaina', married: true },
    { name: 'bilbo', married: false }
  ]);
};
