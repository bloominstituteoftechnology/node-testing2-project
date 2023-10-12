exports.up = function (knex) {
    return knex.schema
      .createTable("makes", makes => {
        makes.increments("make_id")
        makes.string("make_name", 32).notNullable().unique()
      })
      .createTable("models", (models) => {
        models.increments("model_id");
        models.text("model_name", 128).notNullable();
        models.text("model_year", 4).notNullable();
        models
          .integer("make_id")
          .references("make_id")
          .inTable("makes")
          .onDelte("Restrict")
          .onUpdate("Restrict")
      })
  }
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("cars")
      .dropTableIfExists("models")
  }