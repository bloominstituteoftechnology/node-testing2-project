
exports.up = function(knex) {
    return knex.schema
        .createTable('quotes', table => {
            table.increments()
            table.text('name').notNullable()
            table.string('quote', 255)
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('quotes');
};
