exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
    })
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 256).notNullable();
      tbl.integer("logged_out_time");
      tbl
        .integer("role")
        .unsigned()
        .references("roles.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .defaultTo(2);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
