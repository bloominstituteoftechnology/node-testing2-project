exports.up = async function (knex) {
    await knex.schema.createTable('cars', table => {
      table.increments('id')
      table.string('vin', 128).unique()
      table.string('make', 128)
      table.string('model', 128)
      table.decimal('mileage', 128).unsigned()
      table.string('title', 128)
      table.string('transmission', 128)
    })
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('cars')
  };
  