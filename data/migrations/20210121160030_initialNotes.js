
exports.up = function(knex) {
    return knex.schema.createTable('notes', (table) => {
        table.increments();
        table.string('title').notNullable().unique();
        table.string('description');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('notes')
};
