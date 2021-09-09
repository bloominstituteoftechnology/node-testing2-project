
exports.up = function(knex) {
  return knex.schema.createTable('tests', tbl =>{
      tbl.increments('test_id')
      tbl.text('name').notNullable().unique()
      tbl.text('lastname').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tests')
};
