exports.up = function (knex) {
  return knex.schema
    .createTable("joneses", (table) => {
      table.increments("jones_id");
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
    })
    .createTable("animals", (table) => {
      table.increments("animal_id");
      table.string("animal_name").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("animals")
    .dropTableIfExists("joneses");
};
