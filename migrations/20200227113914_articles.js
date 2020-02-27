
exports.up = function(knex) {
    return knex.schema
    .createTable("users", tbl => {
        tbl.increments();
        tbl.text("username", 30)
        .unique()
        .notNullable()
        tbl.text("password", 30).notNullable()
    })
    .createTable("articles", tbl => {
        tbl.increments();
        tbl.string("articleName").notNullable()
        tbl.string("linkToArticle").notNullable()
        tbl.string("categories").notNullable().unique()
        tbl.date("datePublished").notNullable()
        tbl.integer("userId").notNullable().references("users.id")

    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("articles")
    .dropTableIfExists("Users")
  };
  