exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.text('name', 24).notNullable();
        table.integer('age').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
