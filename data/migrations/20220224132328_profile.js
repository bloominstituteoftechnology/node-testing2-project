
exports.up = async function(knex) {
    await knex.schema.createTable('Profile', table => {
        table.increments('Profile_id')

    })
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('Profile')
  };
  