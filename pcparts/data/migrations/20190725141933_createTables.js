
exports.up = function(knex) {
  return knex.schema
    .createTable("GPU", tbl => {
      tbl.increments();
      tbl.text("Manufacter", 128)
        .notNullable();
      tbl.text("Subvendor", 128)
        .notNullable();
      tbl.text("Model", 128)
        .notNullable();
      tbl.integer("MemoryCapacity")
        .notNullable();
      tbl.integer("ClockSpeed")
        .notNullable();
      tbl.integer("Price")
        .notNullable();
    })
    .createTable("CPU", tbl => {
      tbl.increments();
      tbl.text("Manufacter", 128)
        .notNullable();
      tbl.text("Model", 128)
        .notNullable();
      tbl.text("Socket", 128)
        .notNullable();
      tbl.float("ClockSpeed")
        .notNullable();
      tbl.integer("Price")
        .notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("CPU")
    .dropTableIfExists("GPU")
};
