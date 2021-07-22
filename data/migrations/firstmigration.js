exports.up = function (knex) {
    return knex.schema.createTable("books", tbl => {
      tbl.increments();
  
      tbl.string("title", 255).unique().notNullable();
      tbl.integer("author").notNullable();
    });
};
  
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("books");
};