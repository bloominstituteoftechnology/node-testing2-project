
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl =>{
      tbl.increments();

      tbl.string('make', 128)
        .notNullable();

      tbl.string('model', 128)
        .unique()
        .notNullable();

      tbl.float('year', 128)
        .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('cars')
};
