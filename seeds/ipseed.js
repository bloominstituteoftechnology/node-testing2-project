
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ipsource').del()
    .then(function () {
      // Inserts seed entries
      return knex('ipsource').insert([
        {sourcename: 'Disney'},
        {sourcename: 'Wizards of the Coast'},
        {sourcename: 'True Cosm (Public IP)'},
        {sourcename: 'Literature (Public IP)'}
      ]);
    });
};
