exports.up = async function (knex) {
  await knex.schema.createTable("crypto", (table) => {
    table.increments("crypto_id");
    table.string("crypto_name").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("crypto");
};
