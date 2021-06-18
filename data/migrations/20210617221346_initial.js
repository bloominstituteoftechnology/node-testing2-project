exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.text("username", 128).notNullable().unique();
      tbl.text("password").notNullable();
      tbl.text("biography");
      tbl
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("roles")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })
    .createTable("roles", (tbl) => {
      tbl.increments("role_id");
      tbl.string("role_name", 32).notNullable().unique();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
