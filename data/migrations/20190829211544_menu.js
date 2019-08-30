
exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu', tbl => {
      tbl.increments();
      tbl.string('item',128).notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('menu')
  
};
