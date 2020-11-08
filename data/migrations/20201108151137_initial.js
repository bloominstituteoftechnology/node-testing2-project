exports.up = async function (knex) {
  await knex.schema.createTable("cakes", (table) => {
    table.increments();
    table.text("name").notNullable();
    table.text("base_flavor").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("hobbits");
};
