/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("Quarterbacks", (tbl) => {
      tbl.increments("quarterback_id");
      tbl.string("quarterback_name").notNullable();
    })
    .createTable("Teams", (tbl) => {
      tbl.increments("team-id");
      tbl.string("team_name").notNullable();
      tbl
        .integer("quarterback_id")
        .notNullable()
        .unsigned()
        .references("quarterback_id")
        .inTable("Quarterbacks")
        .onDelete("Restrict");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Quarterbacks")
    .dropTableIfExists("Teams");
};
