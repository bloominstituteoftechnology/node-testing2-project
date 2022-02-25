
exports.up = function(knex) {
  return knex.schema
    .createTable('parks', tbl => {
        tbl.increments('park_id')
        tbl.string('park_name', 128).unique().notNullable()
  })
    .createTable('snacks', tbl => {
        tbl.increments('snack_id')
        tbl.string('snack_name', 128).unique().notNullable()
        tbl.integer('park_id')
        .unsigned()
        .references('park_id')
        .inTable('parks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
})
};

exports.down = function(knex) {
  return knex.schema 
    .dropTableIfExists('snacks')
    .dropTableIfExists('parks')
};
