/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('crossfitters').del()
  await knex('crossfitters').insert([
    {name: 'Matt Fraser'},
    {name: 'Justin Medieros'},
    {name: 'Annie Thorsdottier'},
  ]);
};
