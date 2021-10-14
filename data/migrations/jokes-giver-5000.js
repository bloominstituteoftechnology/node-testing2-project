// eslint-disable-next-line no-unused-vars
exports.up = function (knex, Promise) {
    return knex.schema
      .createTable("jokes", (tbl) => {
        tbl.increments("joke_id");
        tbl.string("joke_name", 256).notNullable();
        tbl.string("main_joke", 256).notNullable();
        tbl.string("joke_punchline").notNullable();
      })
  };
  
  // eslint-disable-next-line no-unused-vars
  exports.down = function (knex, Promise) {
    return knex.schema
      .dropTableIfExists("jokes");
  };