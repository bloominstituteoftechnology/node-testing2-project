
exports.up = function(knex) {
  return knex.schema.createTable('dogs', tbl => {
      tbl.increments()
      tbl.text('name', 128).notNullable()
      tbl.text('breed', 128).notNullable()
      tbl.decimal('age')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('dogs')
};
