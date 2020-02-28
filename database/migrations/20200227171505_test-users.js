exports.up = function(knex) {
  return knex.schema.createTable("users", function(tbl) {
    tbl.increments(); // id should always be passed in if you're using foreign keys

    tbl
      .string("name")
      .notNullable()
      .unique()
      .index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
