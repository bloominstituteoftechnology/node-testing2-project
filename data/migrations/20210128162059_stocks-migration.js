
exports.up = function(knex) {
  return knex.schema 
    .createTable('stocks', (tbl) => {
        tbl.increments()
        tbl.string('name')
        tbl.integer('price')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('stocks')
};
