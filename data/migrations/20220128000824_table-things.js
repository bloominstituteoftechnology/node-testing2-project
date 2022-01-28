
exports.up = function(knex) {
  return knex.schema.createTable('things', (tbl) => {
    tbl.increments()
    tbl.string('thing').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('things')
};
