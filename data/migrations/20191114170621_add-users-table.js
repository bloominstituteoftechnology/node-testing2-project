
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments();
      table.string('username', 64)
      .notNullable()
      .unique();
      table.string('name', 128)
      .notNullable();
      table.integer('age')
      .notNullable();
      table.string('state', 64)
      .notNullable();
      table.string('profession', 64);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
