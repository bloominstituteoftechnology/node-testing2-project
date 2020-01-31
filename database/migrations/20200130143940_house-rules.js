
exports.up = function(knex) {
  return knex.schema.createTable('house', house => {

    house.increments();

    house
      .string('houseName', 128 )
      .notNullable()
      .unique();
    
    house.string('password', 128).notNullable();

    house.string("role", 90);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('house');
};
