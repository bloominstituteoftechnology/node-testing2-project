
exports.up = function(knex) {
  return knex.schema.createTable("info", table => {
    table.increments(),
    table.string("title", 32).notNullable(),
    table.string("info").notNullable()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("info");
};
