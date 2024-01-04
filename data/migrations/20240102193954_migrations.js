exports.up = function (knex) {
  return knex.schema.createTable("dirtbikes", (tbl) => {
    tbl.increments("dirtbike_id");
    tbl.text("brand").notNullable();
    tbl.integer("size").notNullable();
    tbl.integer("price").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("dirtbikes");
};
