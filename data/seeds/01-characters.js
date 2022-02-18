/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('characters').insert([
    {id: 1, name: 'Bob Belcher'},
    {id: 2, name: 'Linda Belcher'},
    {id: 3, name: 'Tina Belcher'},
    {id: 4, name: 'Gene Belcher'},
    {id: 5, name: 'Louise Belcher'},
  ])
};
