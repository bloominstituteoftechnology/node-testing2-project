exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments();
        table.string('make').notNullable();
        table.string('model').notNullable();
        table.string('trim').notNullable();
        table.integer('price');
        table.string('link');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};