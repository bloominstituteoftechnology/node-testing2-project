
exports.up = function(knex) {
  return knex.schema.createTable("coasters", table => {
    table.increments("coaster_id");
    table.string("coaster_name").notNullable();
    table.string("abbrv");
    table.decimal("speed");
    table.decimal("height");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("coasters");
};
