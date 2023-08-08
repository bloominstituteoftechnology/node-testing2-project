exports.up = function (knex) {
  return knex.schema.createTable('capitals', tbl => {
    tbl.increments('capital_id');
    tbl.string('city', 30).unique().notNullable();
    tbl.string('country', 30).unique().notNullable();
  });
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('capitals');
}
