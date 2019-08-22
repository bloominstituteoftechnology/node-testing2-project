
exports.up = function(knex) {
  return knex.schema
    .createTable("departments", tbl => {
      tbl.increments();

      tbl
        .string("name", 255)
        .notNullable()
        .unique();

      tbl.string("description", 4000).notNullable();
    })

    .createTable("positions", tbl => {
      tbl.increments();

      tbl
        .string("name", 255)
        .notNullable()
        .unique();

      tbl.string("description", 4000).notNullable();
    })

    .createTable("users", tbl => {
      tbl.increments();

      tbl
        .string("username", 255)
        .notNullable()
        .unique();

      tbl.string("password", 255).notNullable();

      tbl
        .integer("department_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("departments")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("position_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("positions")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("positions")
    .dropTableIfExists("departments");
};