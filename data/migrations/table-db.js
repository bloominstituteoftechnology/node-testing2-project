exports.up = function (knex) {
    return knex.schema
      .createTable('cars', cars => {
        cars.increments('car_id')
        cars.string('car_name', 32).notNullable().unique()
        cars.string('owner_name', 60).notNullable().unique()
      })
  }
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('owners')
      .dropTableIfExists('cars')
  }