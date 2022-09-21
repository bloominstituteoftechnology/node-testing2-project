
exports.seed = function(knex) {
  return knex('students')
    .truncate()
    .then(function () {
      return knex('students').insert([
        {name: 'jordon', age: 21},
        {name: 'Lesly', age: 21},
        {name: 'Jim', age: 34},
        {name: 'Bob', age: 54},
        {name: 'Aaron', age: 5},
        {name: 'Chris', age: 51},
        {name: 'Tammy', age: 30}
      ]);
    });
};
