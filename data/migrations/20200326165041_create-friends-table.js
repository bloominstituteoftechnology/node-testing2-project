exports.up = function(knex) {
  return knex.schema.createTable("friends", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("friends");
};
