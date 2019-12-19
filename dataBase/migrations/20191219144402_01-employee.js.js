
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.string('name', 255)
           .notNullable()
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  