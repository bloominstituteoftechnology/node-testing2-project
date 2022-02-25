exports.up = function (knex) {
  return knex.schema.createTable("players", (tbl) => {
    tbl.increments(), tbl.string("name", 120).notNullable();
    tbl.integer("age").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("players");
};
