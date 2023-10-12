exports.up = function (knex) {
    return knex.schema
      .createTable("makes", makes => {
        makes.increments("make_id")
        makes.string("make_name", 32).notNullable().unique()
      })
      .createTable("models", (models) => {
        models.increments("id");
        models.text("model_name", 128).notNullable();
        models.text("model_year", 4).notNullable();
        models
          .integer("make_id")
          .references("make_id")
          .inTable("makes")
          .onDelete("Restrict")
          .onUpdate("Restrict")
      })
  }
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("makes")
      .dropTableIfExists("models")
  }