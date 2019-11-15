exports.up = function(knex, Promise) {
    return knex.schema.createTable('characters', tbl => {
        tbl.increments();
        tbl.string('name', 255).notNullable();
        tbl.string('specie', 255).notNullable();
        tbl.string('quote', 255).notNullable();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('characters');
};