exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments();
    tbl.string("model", 255).notNullable();
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("cars");
};
