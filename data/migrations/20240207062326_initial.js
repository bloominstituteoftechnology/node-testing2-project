exports.up = function(knex) {
  return knex.schema
    .createTable('shows', tbl => {
        tbl.increments('show_id')
        tbl.text('show_name').notNullable()
        tbl.text('streaming_service').notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('shows')
};
