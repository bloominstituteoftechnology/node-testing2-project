
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('info').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('info').insert([
        {title: 'rowValue1', info: 'here is the real stuff'},
        {title: 'rowValue2', info: 'actual info'},
        {title: 'rowValue3', info: 'the stuff you wanted to know'}
      ]);
    });
};
