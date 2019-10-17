exports.up = function(knex, Promise) {
    return knex.schema.createTable('dogs', tbl => {
      tbl.increments();
  
      tbl.string('breed', 255).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    // undo the operation in up
    return knex.schema.dropTableIfExists('dogs');
  };
  