exports.seed = function(knex, Promise) {
  return knex('f1teams')
  .truncate()
    .then(function () {
      return knex('f1teams').insert([
        {name: 'redbull'},
        {name: 'williams'},
        {name: 'mclaren'},
        {name: 'ferrari'}
      ]);
    });
};

