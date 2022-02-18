/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('characters').insert([
    {name: 'Bob Belcher'},
    {name: 'Linda Belcher'},
    {name: 'Tina Belcher'},
    {name: 'Gene Belcher'},
    {name: 'Louise Belcher'},
  ])
};
