exports.seed = function (knex) {
  return knex('students').truncate()
  .then(function () {
    return knex ('students').insert([
      { student_name: 'Priscila'},
      { student_name: 'Bob'},
      { student_name: 'Anna'},
      { student_name: 'John'},
    ]);
    
  });
};
