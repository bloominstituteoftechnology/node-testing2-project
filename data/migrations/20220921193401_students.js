
exports.up = function(knex) {
  return knex.schema.createTable('students', tbl => {
    tbl.increments()
    tbl.string('name').notNullable()
    tbl.integer('age').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('students')
};
