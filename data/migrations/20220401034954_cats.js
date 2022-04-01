
exports.up = function(knex) {
  return knex.schema.createTable("cats", cats => {
      cats.increments("cat_id");

      cats
        .string("name", 128)
        .notNullable()
        .unique();

      cats
        .string("breed", 128)
        .notNullable();

      cats
        .integer("age")
        .notNullable();

      cats
        .boolean("hairless")
        .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cats");
};
