exports.up = async function (knex) {
  await knex.schema.createTable("children", (table) => {
    table.increments("child_id");
    table.text("first_name").notNullable();
    table.text("last_name").notNullable();
    table.text("hobbies");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("children");
};
