exports.up = function(knex) {
    return knex.schema.createTable('smash', tbl => {
        tbl.increments();
        tbl.string('name').unique().notNullable();
        tbl.string('series').unique().notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('smash');
};
