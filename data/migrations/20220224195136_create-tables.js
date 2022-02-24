
exports.up = function(knex) {
  return knex.schema
  .createTable('shoungs', tbl => {
      tbl.increments();
      tbl.string('shoung_name', 128).notNullable().unique();
      tbl.integer('shoung_age');
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('shoungs');
};
