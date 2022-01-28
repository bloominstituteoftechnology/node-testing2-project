
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('things').del()
    .then(function () {
      // Inserts seed entries
      return knex('things').insert([
        { thing: 'thing1' },
        { thing: 'thing2' },
        { thing: 'thing3' }
      ]);
    });
};
