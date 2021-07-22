exports.up = function (knex) {
  return knex.schema.createTable("pokemon", (tbl) => {
    tbl.increments("pokemon_id");
    tbl.text("pokemon_name").notNullable();
    tbl.integer("max_hp").unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("pokemon");
};
