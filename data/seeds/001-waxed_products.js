
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('waxed_products').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('waxed_products').insert([
        {id: 1, name: 'Hidden Fates ETB'},
        {id: 2, name: 'Kanto Power Box'},
        {id: 3, name: 'Vivid Voltage ETB'}
      ]);
    });
};
