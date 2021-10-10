exports.up = function(knex) {
    return knex.schema
        .createTable('jokes', tbl=> {
            tbl.increments('jokes_id')
            tbl.text('joke').notNullable()
            tbl.text('punchline').notNullable()
        })
}

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExist("jokes")
}