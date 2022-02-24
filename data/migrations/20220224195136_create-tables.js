
exports.up = function(knex) {
  return knex.schema
  .createTable('shoungs', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable().unique();
      tbl.integer('age');
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('shoungs');
};
