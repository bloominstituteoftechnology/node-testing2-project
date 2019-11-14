exports.up = function(knex) {
  knex.schema.createTable("items", table => {
    table.increments();
    table
      .string("item-name", 128)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  knex.schema.DropTableIfExists("items");
};
