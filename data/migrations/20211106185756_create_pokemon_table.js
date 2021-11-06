exports.up = function (knex) {
    return knex.schema.createTable('pokemon', tbl => {
        tbl.increments()
        tbl.string('name', 50).unique().notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('pokemon');
};
