
exports.up = function(knex) {
  return knex.schema.createTable('employees', employees => {
        employees.increments();
        employees.string('name', 128)
        .notNullable();
        employees.string('email', 128)
        .unique();
        employees.string('department', 128)
        .notNullable();

  });
};


exports.down = function(knex) {
   return  knex.schema.dropTableIfExsists('employees');
};
