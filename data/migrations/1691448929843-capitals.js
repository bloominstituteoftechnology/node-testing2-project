module.exports.up = function (knex) {
  return knex.schema.createTable('capitals', tbl => {
    tbl.increments();

    tbl.string('city', 30).unique().notNullable();
    tbl.string('country', 30).unique().notNullable();
  });
}

module.exports.down = function (knex) {
  return knex.schema.dropTableIfExists('capitals');
}
