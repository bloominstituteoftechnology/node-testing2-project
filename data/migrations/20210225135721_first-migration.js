
exports.up = function(knex) {
  return knex.schema
  .createTable('pokemon', tbl =>{
      tbl.increments()
      tbl.string('name', 250).notNullable().unique()
      tbl.integer('pokedex number').notNullable().unique()
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('pokemon')
};
