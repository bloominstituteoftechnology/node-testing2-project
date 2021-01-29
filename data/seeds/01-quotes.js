
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('quotes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('quotes').insert([
        { name: 'Bob', quote: 'Hello world' },
        { name: 'John', quote: 'Goodbye world' },
        { name: 'Carl', quote: 'Buy Gamestop' },
      ]);
    });
};
