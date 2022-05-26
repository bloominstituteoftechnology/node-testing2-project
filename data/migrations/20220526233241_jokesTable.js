/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema   
    .createTable('jokes', tbl => {
        tbl.increments('joke_id')
        tbl.text('joke').notNullable()
        tbl.text('punchline').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('jokes')
};
