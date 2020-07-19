exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', tbl => {
    tbl.increments();

    tbl.string('title', 128).notNullable();
    tbl.string('overview', 255);
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists('movies');
};
