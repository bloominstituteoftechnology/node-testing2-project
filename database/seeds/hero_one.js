
exports.seed = function(knex, Promise) {

  return knex('heros')
    .truncate()
    .then(function() {
      return knex('heros').insert([
        {id: 1, name: 'Patricia Darden'},
        {id: 2, name: 'Michelle Obama'},
        {id: 3, name: 'Melinda Gates'},
        {id: 4, name: 'Jay-Z'},
        {id: 5, name: 'Beyonce'},
        {id: 6, name: 'Bob Marley'},
        {id: 7, name: 'Toni Darden'}
      ]);
    });
};
