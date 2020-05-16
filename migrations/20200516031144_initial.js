exports.up = async function (knex) {
  await knex.schema.createTable("cars", (table) => {
    table.increments("id");
    table.integer("year");
    table.text("make").notNullable();
    table.text("model").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("cars");
};
