
exports.up = function(knex) {
    return knex.schema.createTable('pets', table => {
        table.increments('pet_id');
        table.string('name', 128).unique().notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('pets');
  };