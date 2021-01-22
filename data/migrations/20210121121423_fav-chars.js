
exports.up = async function(knex) {
  await knex.schema.createTable('favChars',(table)=>{
      table.increments()
      table.text('name').notNullable().unique()
      table.text('anime').notNullable()
      table.boolean('topTen').defaultTo(false)
      table.integer('rank').unique()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('favChars')
};
