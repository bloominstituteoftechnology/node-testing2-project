exports.up = function (knex) {
  return knex.schema
    .createTable("companies", (tbl) => {
      tbl.increments("company_id");
      tbl.string("company_name", 100).unique().notNullable();
    })
    .createTable("phones", (tbl) => {
      tbl.increments("phone_id");
      tbl.string("phone_name", 100).unique().notNullable();
      tbl
        .integer("company_id")
        .unsigned()
        .notNullable()
        .references("company_id")
        .inTable("companies")
        .onDelete("CASCADE")
        .onUpdate("RESTRICT");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("phones").dropTableIfExists("companies");
};
