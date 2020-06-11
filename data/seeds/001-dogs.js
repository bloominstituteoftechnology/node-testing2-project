exports.seed = function(knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
  return knex('dogs').truncate()
    .then(function () {
      // add data into insert
      return knex('dogs').insert([
        { name: 'meemo', breed: 'poodle terrier', age: 7 },
        { name: 'leslie', breed: 'german shepherd', age: 1 },
        { name: 'gator', breed: 'poodle terrier'},
        { name: 'bentley', breed: 'pug'}
      ]);
    });
};
