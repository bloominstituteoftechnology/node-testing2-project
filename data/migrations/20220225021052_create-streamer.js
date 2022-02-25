
exports.up = function(knex) {
  return knex.schema.createTable('streamers', tbl => {
      tbl.increments('streamer_id');
      tbl.string('name', 200).unique().notNullable();
      tbl.string('affiliation', 200).unique().notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('streamers')
};
