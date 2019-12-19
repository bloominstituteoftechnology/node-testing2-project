exports.up = function (knex, Promise) {
  return knex.schema.createTable('festivals', tbl => {
    tbl.increments();

    tbl.string('name', 255).notNullable();
  });
};

exports.down = function (knex, Promise) {

  return knex.schema.dropTableIfExists('festivals');
};
