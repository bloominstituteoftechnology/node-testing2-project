exports.up = function(knex) {
    return knex.schema
        .createTable('stoics', (table) => {
            table.increments('id').primary();
            table.text("stoic").notNullable();
        })
}

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('stoics')
}
