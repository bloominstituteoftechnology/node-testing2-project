exports.up = function(knex) {
  return knex.schema.createTable("packages", tbl => {
    tbl.increments();
    tbl
      .string("name", 128)
      .notNullable()
      .unique()
      .index();
    tbl.string("version", 128).notNullable();
    tbl.string("author", 128).notNullable();
    tbl.string("license", 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("packages");
};
