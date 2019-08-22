exports.up = function(knex) {
  return knex.schema.createTable("superheroes", tbl => {
    tbl.increments();
    tbl
      .string("superhero")
      .unique()
      .notNullable();
    tbl.string("superpower").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("superheroes");
};
