exports.up = function (knex) {
  return knex.schema.createTable('best_books', (tbl) => {
    tbl.increments();

    tbl.string('name', 255).unique().notNullable();
    tbl.string('author', 128);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('best_books');
};
