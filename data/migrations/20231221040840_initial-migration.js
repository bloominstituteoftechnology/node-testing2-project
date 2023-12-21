
exports.up = function(knex) {
  return knex.schema.createTable('pokemons', tbl => {
    tbl.increments();
    tbl.string('name', 128).notNullable();
    tbl.integer('level').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pokemons');
};
