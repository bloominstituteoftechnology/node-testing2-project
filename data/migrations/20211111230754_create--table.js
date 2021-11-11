exports.up = function(knex) {
  return knex.schema.createTable('students', table => {
    table.increments('student_id');
    table.string('student_name', 128).unique().notNullable();
  });
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('students');
  
};
