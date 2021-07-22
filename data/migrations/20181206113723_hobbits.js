exports.up = function (knex) {
  return knex.schema.createTable("hobbits", tbl => {
    tbl.increments();

    tbl.string("name", 255).unique().notNullable();
  });
};

exports.down = function (knex) {
  // undo the operation in up
  return knex.schema.dropTableIfExists("hobbits");
};
