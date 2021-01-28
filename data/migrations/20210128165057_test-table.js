exports.up = function (knex) {
  return knex.schema.createTable("memes", (tbl) => {
    tbl.increments();
    tbl.string("name", 80).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("memes");
};
