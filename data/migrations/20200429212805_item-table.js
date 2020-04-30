exports.up = function(knex) {
    return knex.schema.createTable('items', (tbl) => {
        tbl.increments();
        tbl.string('item', 128).notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('items');
};
