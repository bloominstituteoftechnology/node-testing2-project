
exports.up = async function(knex) {
  await knex.schema.createTable('vampires', (table) => {
      table.increments()
      table.text('name').notNull()
      table.integer('age_turned')
      table.integer('birth_year')
      table.boolean('still_alive').default(true)
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('vampires')
};
