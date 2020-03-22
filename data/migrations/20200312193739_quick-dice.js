

exports.up = async function(knex) {
    await knex.schema.createTable("users", table => {
        table.increments();
        table.text("username").notNull().unique()
        table.text("password").notNull()
        table.text("char_name").notNull()
        table.text("race")
        table.text("class")
        table.integer("str_mod").notNull()
    })

    await knex.schema.createTable("actions", table => {
        table.increments();
        table.text("action_name").notNull()
        table.text("action_type").notNull()
        table.text("dmg_type").notNull()
        table.integer("dice_amt").notNull()
        table.integer("dice").notNull()
        table.integer("to_hit_mod")
        table.integer("dmg_mod")
        table.integer("user_id")
          .references("id")
          .inTable("users")

    })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("actions")
  await knex.schema.dropTableIfExists("users")
};
