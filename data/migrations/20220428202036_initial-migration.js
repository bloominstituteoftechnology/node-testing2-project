
exports.up = function(knex) {
    return knex.schema
    .createTable('students', tbl => {
        tbl.increments('student_id')
        tbl.string('student_name', 200).notNullable()
        tbl.integer('age').notNullable()
        tbl.string('grade').notNullable()
    })
    .createTable('english_tests', tbl => {
        tbl.increments('english_test_id')
        tbl.datetime('date_time')
        tbl.string('known_alphabet', 26)
        tbl.string('unknown_alphabet', 26)
        tbl.string('comments', 200)
            .comment('example: confuses b for d')
        tbl.integer('student_id')
            .unsigned()
            .notNullable()
            .references('student_id')
            .inTable('students')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('english_tests')
      .dropTableIfExists('students')
  };
  