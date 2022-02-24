
exports.up = async function(knex) {
    await knex.schema.createTable('Profile', table => {
        table.increments('Profile_id')
        table.text('Name').notNullable()
        table.text('Abilities')
    })
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('Profile')
  };
  