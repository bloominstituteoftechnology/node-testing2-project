
exports.up = function(knex) {
    return knex.schema.createTable('dogs', table => {
      table.increments()
      table.string('breed').unique().notNullable()
      table.string('countryOrigin').notNullable()
      table.integer('avgWeightPounds').notNullable()
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('dogs')
  };
  