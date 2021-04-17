
exports.up = function(knex) {
  return knex.schema
    .createTable('tokens', tbl => {
        tbl.increments('token_id');
        tbl.string('token_name', 128)
            .unique()
            .notNullable();
    })
    .createTable('token_info', tbl => {
        tbl.increments('info_id');
        tbl.text('token_description', 1024)
            .unique()
            .notNullable();
        tbl.string('token_standard', 24),
        tbl.string('token_address', 1024)
            .unique()
            .notNullable();
        tbl.integer('token_id')
            .unsigned()
            .notNullable()
            .references('token_id')
            .inTable('tokens')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('token_info')
    .dropTableIfExists('tokens');
};
