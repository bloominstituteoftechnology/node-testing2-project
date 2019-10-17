
exports.up = function(knex) {
    return knex.schema.createTable('community', tbl => {
        tbl.increments();
    
        tbl.string('name', 255).notNullable();
        tbl.string('catch_phrase', 255).unique();
      });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('community')
};
