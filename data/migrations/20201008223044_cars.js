exports.up = function (knex) {
  return knex.schema.createTable("cars-info", (tbl) => {
    tbl.increments();

    tbl.string("make", 255).notNullable();
    tbl.string("model", 255).notNullable();
    tbl.integer("year").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars-info");
};
