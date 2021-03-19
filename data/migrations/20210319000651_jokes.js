
exports.up = function(knex) {
  return knex.schema.createTable("Jokes", tbl => {
      tbl.increments()
      tbl.text("Setup")
      .notNullable()
      tbl.text("Punchline")
      .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Jokes")
};
