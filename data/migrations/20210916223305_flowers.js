
exports.up = function(knex) {
    return knex.schema
    .createTable('flowers', tbl=>{
        tbl.increments('id');
        tbl.text(`name`, 128)
            .notNullable();
        tbl.text(`description`);
        tbl.boolean(`collected`)
            .defaultTo(0);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('flowers')
};
